namespace EstudoBiblico.Api.Application.DTOs;

public record StudyProgressDto(IEnumerable<Guid> CompletedLessonIds);
public record ResumeDto(string LessonSlug);
