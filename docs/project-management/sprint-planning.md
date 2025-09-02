# Sprint Planning

## RisingGen Sprint Planning Process

This document outlines the sprint planning methodology and processes used by the RisingGen development team. It provides guidance for organizing and executing development sprints effectively.

## Sprint Methodology

RisingGen uses a modified Scrum methodology with two-week sprints. Our approach balances agility with predictable delivery schedules, allowing us to respond to changing requirements while maintaining a steady development pace.

### Sprint Cadence

- **Sprint Duration**: 2 weeks (10 working days)
- **Sprint Planning**: First day of sprint
- **Daily Standup**: Every workday, 15 minutes
- **Sprint Review**: Last day of sprint
- **Sprint Retrospective**: Last day of sprint
- **Backlog Refinement**: Mid-sprint (day 5)

### Team Structure

- **Product Owner**: Responsible for product backlog and priorities
- **Scrum Master**: Facilitates Scrum process and removes impediments
- **Development Team**: Cross-functional team that builds the product
  - Frontend Developers
  - Backend Developers
  - UX/UI Designers
  - QA Engineers

## Sprint Planning Meeting

### Objectives

1. Review sprint goal and business context
2. Discuss and clarify user stories
3. Estimate story points for each item
4. Commit to sprint backlog
5. Break down stories into tasks

### Meeting Format

- **Duration**: 2-3 hours
- **Attendees**: Whole team (required)
- **Preparation**:
  - Product Owner: Prioritized backlog
  - Development Team: Review top backlog items
  - Scrum Master: Facilitate meeting

### Sprint Planning Agenda

1. **Sprint Goal Review** (15 min)

   - Product Owner presents sprint goal
   - Business context and priority explanation

2. **Capacity Planning** (15 min)

   - Team member availability (vacations, part-time)
   - Previous sprint velocity review
   - Current sprint capacity calculation

3. **Backlog Item Discussion** (1.5 hours)

   - Walk through top priority items
   - Questions and clarification
   - Estimation (Planning Poker)
   - Definition of Done review

4. **Sprint Commitment** (30 min)

   - Select items for sprint backlog
   - Confirm team commitment
   - Task breakdown

5. **Summary and Next Steps** (15 min)
   - Recap sprint goal and commitments
   - Identify initial impediments
   - Confirm first tasks

## Story Point Estimation

### Estimation Scale

We use the Fibonacci sequence for story point estimation:

- **1 point**: Trivial change, well-understood
- **2 points**: Simple change, familiar territory
- **3 points**: Moderate complexity, some unknowns
- **5 points**: Complex task, significant uncertainty
- **8 points**: Very complex, substantial unknowns
- **13 points**: Consider breaking down the story

### Planning Poker Process

1. Product Owner presents user story
2. Team asks questions for clarification
3. Each team member selects an estimate card
4. All reveal estimates simultaneously
5. Discuss differences in estimates
6. Re-estimate until consensus is reached

## User Story Format

User stories follow a consistent format:

```
As a [user role],
I want [functionality]
So that [benefit]
```

### Acceptance Criteria

Each user story includes clear acceptance criteria:

```
Given [context/precondition]
When [action]
Then [expected result]
```

### Definition of Ready

Before a story is included in sprint planning, it must meet these criteria:

- Clear, concise description
- Detailed acceptance criteria
- Necessary design assets available
- Technical dependencies identified
- Estimated by the team
- Prioritized by Product Owner

### Definition of Done

A user story is considered "Done" when:

- Code is written and follows standards
- Unit tests are written and passing
- Integration tests are written and passing
- Code is peer-reviewed
- Documentation is updated
- Feature is deployed to staging
- Acceptance criteria are verified
- Product Owner approval

## Sprint Execution

### Daily Standup

- **Time**: Daily, same time each day
- **Duration**: 15 minutes max
- **Format**: Each team member answers:
  1. What did I accomplish yesterday?
  2. What will I work on today?
  3. Are there any impediments in my way?

### Sprint Board

Our sprint board uses the following columns:

1. **Backlog**: Stories planned for the sprint
2. **In Progress**: Currently being worked on
3. **Review**: Ready for code review
4. **QA**: Being tested
5. **Done**: Completed and verified

### Work in Progress Limits

- Maximum 2 items per developer in "In Progress"
- Focus on completing stories before starting new ones
- Team helps unblock items rather than starting new work

## Sprint Review

### Objectives

1. Demonstrate completed work to stakeholders
2. Gather feedback on delivered features
3. Update product backlog based on feedback
4. Celebrate team accomplishments

### Meeting Format

- **Duration**: 1 hour
- **Attendees**: Development team, Product Owner, stakeholders
- **Preparation**: Prepare demos of completed features

### Sprint Review Agenda

1. **Sprint Goal Review** (5 min)

   - Recap sprint goal
   - Overview of completed work

2. **Feature Demonstrations** (30-40 min)

   - Demo each completed feature
   - Team members demonstrate their work
   - Answer questions from stakeholders

3. **Feedback Collection** (10 min)

   - Stakeholder impressions
   - Suggested improvements
   - New ideas or requirements

4. **Next Steps Discussion** (5 min)
   - Product backlog updates
   - Prioritization changes
   - Impact on upcoming sprints

## Sprint Retrospective

### Objectives

1. Reflect on the sprint process
2. Identify what went well
3. Identify areas for improvement
4. Create actionable improvements for next sprint

### Meeting Format

- **Duration**: 1 hour
- **Attendees**: Development team, Scrum Master
- **Facilitation**: Scrum Master leads

### Retrospective Agenda

1. **Set the Stage** (5 min)

   - Review previous retro action items
   - Set a positive, constructive tone

2. **Data Gathering** (15 min)

   - What went well?
   - What could be improved?
   - What questions/puzzles do we have?

3. **Generate Insights** (15 min)

   - Find patterns and root causes
   - Discuss impact on team and productivity

4. **Decide Actions** (15 min)

   - Identify 2-3 concrete improvement actions
   - Assign owners and deadlines

5. **Close the Retrospective** (10 min)
   - Summarize action items
   - Thank the team for participation

### Retrospective Techniques

- **Start/Stop/Continue**: What should we start, stop, or continue doing?
- **Sailboat**: What's pushing us forward, holding us back, or presenting risks?
- **Mad/Sad/Glad**: What made us feel mad, sad, or glad during the sprint?
- **4Ls**: What did we like, learn, lacked, or longed for?

## Backlog Refinement

### Objectives

1. Review and clarify upcoming backlog items
2. Break down large stories into smaller ones
3. Provide initial estimates for future sprint planning
4. Ensure backlog items meet Definition of Ready

### Meeting Format

- **Duration**: 1 hour
- **Frequency**: Weekly
- **Attendees**: Development team, Product Owner
- **Preparation**: Product Owner prepares prioritized items

### Refinement Process

1. Product Owner explains high-priority items
2. Team asks questions and seeks clarification
3. Break down large stories if needed
4. Provide initial estimates
5. Identify dependencies and risks
6. Update acceptance criteria as needed

## Tools and Artifacts

### Sprint Planning Tools

- **JIRA**: Sprint planning and tracking
- **Confluence**: Documentation and knowledge sharing
- **Miro**: Virtual whiteboarding for remote planning
- **Slack**: Team communication

### Sprint Artifacts

- **Sprint Backlog**: Stories committed for the sprint
- **Sprint Board**: Visual representation of work status
- **Burndown Chart**: Progress tracking
- **Impediment Log**: Tracking and resolving blockers
- **Sprint Report**: Summary of sprint outcomes

## Remote Collaboration

As a distributed team, we employ these practices for effective remote sprint planning:

- **Video Always On**: Maintain visual connection
- **Digital Tools**: Use collaborative planning tools
- **Pre-reads**: Share materials before meetings
- **Timeboxed Discussions**: Keep meetings focused
- **Clear Action Items**: Document decisions and next steps
- **Asynchronous Updates**: Regular status updates in Slack

## Sprint Planning Best Practices

1. **Focus on Value**: Prioritize user-facing value
2. **Right-size Stories**: Stories should be completable within sprint
3. **Balanced Workload**: Mix of story types and complexity
4. **Plan for Learning**: Include spikes for research when needed
5. **Buffer Time**: Plan to 80% capacity for unexpected issues
6. **Cross-functional Collaboration**: Encourage pairing and knowledge sharing
7. **Continuous Improvement**: Apply retrospective learnings to planning

---

This document serves as a guide for the RisingGen team's sprint planning process. The process itself should evolve based on team needs and retrospective outcomes.
