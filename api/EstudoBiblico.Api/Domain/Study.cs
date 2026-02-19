namespace EstudoBiblico.Api.Domain;

public class Study
{
    public Guid Id { get; set; }
    public string Title { get; set; } = string.Empty;
    public string Slug { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
    public DateTime CreatedAt { get; set; }
    public ICollection<Lesson> Lessons { get; set; } = new List<Lesson>();
}
