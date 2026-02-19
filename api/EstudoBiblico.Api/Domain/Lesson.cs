namespace EstudoBiblico.Api.Domain;

public class Lesson
{
    public Guid Id { get; set; }
    public Guid StudyId { get; set; }
    public string Title { get; set; } = string.Empty;
    public string Slug { get; set; } = string.Empty;
    public string ContentMarkdown { get; set; } = string.Empty;
    public int Order { get; set; }
    public DateTime CreatedAt { get; set; }
    public Study Study { get; set; } = null!;
    public ICollection<UserLessonProgress> UserLessonProgresses { get; set; } = new List<UserLessonProgress>();
}
