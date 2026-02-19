using System.Security.Claims;
using EstudoBiblico.Api.Application.DTOs;
using EstudoBiblico.Api.Domain;
using EstudoBiblico.Api.Infrastructure;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace EstudoBiblico.Api.Controllers;

[ApiController]
[Route("api/progress")]
[Authorize]
public class ProgressController : ControllerBase
{
    private readonly AppDbContext _db;

    public ProgressController(AppDbContext db) => _db = db;

    private Guid GetUserId() =>
        Guid.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier)!);

    [HttpPost("{lessonId:guid}")]
    public async Task<IActionResult> MarkComplete(Guid lessonId)
    {
        var userId = GetUserId();
        if (await _db.UserLessonProgresses.AnyAsync(p => p.UserId == userId && p.LessonId == lessonId))
            return Conflict("Already marked as complete.");

        var lesson = await _db.Lessons.FindAsync(lessonId);
        if (lesson is null) return NotFound();

        _db.UserLessonProgresses.Add(new UserLessonProgress
        {
            UserId = userId,
            LessonId = lessonId,
            CompletedAt = DateTime.UtcNow
        });
        await _db.SaveChangesAsync();
        return Ok();
    }

    [HttpDelete("{lessonId:guid}")]
    public async Task<IActionResult> UndoComplete(Guid lessonId)
    {
        var userId = GetUserId();
        var progress = await _db.UserLessonProgresses
            .FirstOrDefaultAsync(p => p.UserId == userId && p.LessonId == lessonId);

        if (progress is null) return NotFound();

        _db.UserLessonProgresses.Remove(progress);
        await _db.SaveChangesAsync();
        return NoContent();
    }

    [HttpGet("study/{studyId:guid}")]
    public async Task<IActionResult> GetStudyProgress(Guid studyId)
    {
        var userId = GetUserId();
        var completedIds = await _db.UserLessonProgresses
            .Where(p => p.UserId == userId && p.Lesson.StudyId == studyId)
            .Select(p => p.LessonId)
            .ToListAsync();

        return Ok(new StudyProgressDto(completedIds));
    }

    [HttpGet("resume/{studyId:guid}")]
    public async Task<IActionResult> Resume(Guid studyId)
    {
        var userId = GetUserId();

        var allLessons = await _db.Lessons
            .Where(l => l.StudyId == studyId)
            .OrderBy(l => l.Order)
            .ToListAsync();

        if (!allLessons.Any()) return NotFound();

        var completedIds = await _db.UserLessonProgresses
            .Where(p => p.UserId == userId && p.Lesson.StudyId == studyId)
            .Select(p => p.LessonId)
            .ToHashSetAsync();

        var nextLesson = allLessons.FirstOrDefault(l => !completedIds.Contains(l.Id))
            ?? allLessons.Last();

        return Ok(new ResumeDto(nextLesson.Slug));
    }
}
