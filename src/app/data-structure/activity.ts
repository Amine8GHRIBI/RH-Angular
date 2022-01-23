export class IActivity {
    Subject: string;
    Location: string;
    StartTime: string;
    EndTime: string;
    IsAllDay: boolean;
    StartTimezone: string;
    EndTimezone: string;
    ProjectId: string;
    TaskId: string;
    Description: string;
    RecurrenceRule: string;
    Id: string;
    RecurrenceException: string;
    RecurrenceID: string
    constructor(subject, locationn, startTime, endTime, isAllDay, startTimezone, endTimezone, projectId, taskId, description, recurrenceRule, id,recurrenceException,recurrenceID ) {
        this.Subject = subject;
        this.Location = locationn;
        this.StartTime = startTime;
        this.EndTime = endTime;
        this.IsAllDay = isAllDay;
        this.StartTimezone = startTimezone;
        this.EndTimezone = endTimezone;
        this.ProjectId = projectId;
        this.TaskId = taskId;
        this.Description = description;
        this.RecurrenceRule = recurrenceRule;
        this.Id = id;
        this.RecurrenceException = recurrenceException;
        this.RecurrenceID = recurrenceID;
    }
}