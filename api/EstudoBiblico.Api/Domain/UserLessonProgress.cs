namespace EstudoBiblico.Api.Domain;

public class UserLessonProgress
{
    public Guid UserId { get; set; }
    public Guid LessonId { get; set; }
    public DateTime CompletedAt { get; set; }
    public User User { get; set; } = null!;
    public Lesson Lesson { get; set; } = null!;
}
