using EstudoBiblico.Api.Application.DTOs;
using EstudoBiblico.Api.Infrastructure;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace EstudoBiblico.Api.Controllers;

[ApiController]
[Route("api/studies")]
public class StudiesController : ControllerBase
{
    private readonly AppDbContext _db;

    public StudiesController(AppDbContext db) => _db = db;

    [HttpGet]
    public async Task<IEnumerable<StudyListItemDto>> GetAll() =>
        await _db.Studies
            .OrderBy(s => s.CreatedAt)
            .Select(s => new StudyListItemDto(s.Id, s.Title, s.Slug, s.Description, s.CreatedAt))
            .ToListAsync();

    [HttpGet("{studySlug}")]
    public async Task<IActionResult> GetBySlug(string studySlug)
    {
        var study = await _db.Studies
            .Include(s => s.Lessons.OrderBy(l => l.Order))
            .FirstOrDefaultAsync(s => s.Slug == studySlug);

        if (study is null) return NotFound();

        var dto = new StudyDetailDto(
            study.Id, study.Title, study.Slug, study.Description, study.CreatedAt,
            study.Lessons.Select(l => new LessonSummaryDto(l.Id, l.Title, l.Slug, l.Order)));

        return Ok(dto);
    }

    [HttpGet("{studySlug}/lessons/{lessonSlug}")]
    public async Task<IActionResult> GetLesson(string studySlug, string lessonSlug)
    {
        var lesson = await _db.Lessons
            .Include(l => l.Study)
            .FirstOrDefaultAsync(l => l.Slug == lessonSlug && l.Study.Slug == studySlug);

        if (lesson is null) return NotFound();

        var dto = new LessonDetailDto(lesson.Id, lesson.Title, lesson.Slug, lesson.ContentMarkdown, lesson.Order, lesson.CreatedAt);
        return Ok(dto);
    }
}
