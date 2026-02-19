using EstudoBiblico.Api.Domain;
using Microsoft.EntityFrameworkCore;

namespace EstudoBiblico.Api.Infrastructure;

public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

    public DbSet<Study> Studies => Set<Study>();
    public DbSet<Lesson> Lessons => Set<Lesson>();
    public DbSet<User> Users => Set<User>();
    public DbSet<UserLessonProgress> UserLessonProgresses => Set<UserLessonProgress>();

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Study>(e =>
        {
            e.HasKey(x => x.Id);
            e.HasIndex(x => x.Slug).IsUnique();
            e.Property(x => x.Title).IsRequired();
            e.Property(x => x.Slug).IsRequired();
        });

        modelBuilder.Entity<Lesson>(e =>
        {
            e.HasKey(x => x.Id);
            e.HasIndex(x => new { x.StudyId, x.Slug }).IsUnique();
            e.HasIndex(x => new { x.StudyId, x.Order });
            e.Property(x => x.Title).IsRequired();
            e.Property(x => x.Slug).IsRequired();
            e.Property(x => x.ContentMarkdown).IsRequired();
            e.HasOne(x => x.Study).WithMany(x => x.Lessons).HasForeignKey(x => x.StudyId);
        });

        modelBuilder.Entity<User>(e =>
        {
            e.HasKey(x => x.Id);
            e.HasIndex(x => x.Email).IsUnique();
            e.Property(x => x.Email).IsRequired();
            e.Property(x => x.PasswordHash).IsRequired();
        });

        modelBuilder.Entity<UserLessonProgress>(e =>
        {
            e.HasKey(x => new { x.UserId, x.LessonId });
            e.HasOne(x => x.User).WithMany(x => x.UserLessonProgresses).HasForeignKey(x => x.UserId);
            e.HasOne(x => x.Lesson).WithMany(x => x.UserLessonProgresses).HasForeignKey(x => x.LessonId);
        });
    }
}
