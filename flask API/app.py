from flask import Flask, request, jsonify
from datetime import datetime
import re
import pytz

app = Flask(__name__)
pst = pytz.timezone('America/Los_Angeles')

@app.route('/collect_schedule', methods=['POST'])
def collect_schedule():
    data = request.json
    schedule = data.get('schedule', {})
    result = {}

    for day, busy_times in schedule.items():
        if busy_times.lower() == 'none':
            result[day] = []
        else:
            busy_hours = []
            for hour in busy_times.split(', '):
                start_str, end_str = re.split(r'[-,]', hour.strip())
                start_time = datetime.strptime(start_str.strip(), '%I:%M%p').replace(tzinfo=pst)
                end_time = datetime.strptime(end_str.strip(), '%I:%M%p').replace(tzinfo=pst)
                busy_hours.append((start_time.hour, start_time.minute, end_time.hour, end_time.minute))
            result[day] = busy_hours
    
    return jsonify(result)

if __name__ == '__main__':
    app.run(debug=True)
