<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Event Leaderboard</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
</head>
<body class="bg-light">
    <div class="container mt-5">
        <h1 class="text-center mb-4">📊 Event Leaderboard</h1>

        {% if most_registered_event %}
            <div class="alert alert-success text-center">
                Most Popular Event So Far: <strong>{{ most_registered_event }}</strong>
            </div>
        {% endif %}

        <h3 class="mt-4">📌 Event Registration Stats</h3>
        {% for event, details in events.items() %}
            <p class="mt-3"><strong>{{ event }}</strong></p>
            <div class="progress mb-2">
                <div class="progress-bar bg-info" role="progressbar"
                     style="width: {{ (event_counts[event] / (event_counts[event] + details.slots) * 100) if (event_counts[event] + details.slots) > 0 else 0 }}%">
                    {{ event_counts[event] }} Registered
                </div>
            </div>
            <small>{{ details.slots }} slot(s) remaining</small>
        {% endfor %}

        <h3 class="mt-5">🎉 Featured Participants</h3>
        <ul class="list-group">
            {% for participant in participants[:5] %}
                <li class="list-group-item">
                    {{ participant.name }} ({{ participant.event }})
                </li>
            {% endfor %}
        </ul>

        <a href="/" class="btn btn-primary mt-4">Back to Home</a>
    </div>
</body>
</html>
