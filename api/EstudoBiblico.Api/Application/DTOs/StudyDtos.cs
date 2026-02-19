namespace EstudoBiblico.Api.Application.DTOs;

public record LessonSummaryDto(Guid Id, string Title, string Slug, int Order);

public record StudyListItemDto(Guid Id, string Title, string Slug, string Description, DateTime CreatedAt);

public record StudyDetailDto(Guid Id, string Title, string Slug, string Description, DateTime CreatedAt, IEnumerable<LessonSummaryDto> Lessons);

public record LessonDetailDto(Guid Id, string Title, string Slug, string ContentMarkdown, int Order, DateTime CreatedAt);
