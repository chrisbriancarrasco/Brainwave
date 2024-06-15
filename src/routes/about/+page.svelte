<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Contact Ticket System</title>
</head>
<body>
    <h1>Contact Ticket System</h1>
    <form id="contactForm">
        <label for="course_name">Course Name:</label>
        <select id="course_name" name="course_name" required>
            <option value="">Select a course</option>
            <option value="CPSC 120">CPSC 120</option>
            <option value="CPSC 121">CPSC 121</option>
            <option value="CPSC 131">CPSC 131</option>
            <option value="CPSC 223">CPSC 223</option>
            <option value="CPSC 240">CPSC 240</option>
            <option value="CPSC 253">CPSC 253</option>
            <option value="CPSC 315">CPSC 315</option>
            <option value="CPSC 323">CPSC 323</option>
            <option value="CPSC 332">CPSC 332</option>
            <option value="CPSC 335">CPSC 335</option>
            <option value="CPSC 351">CPSC 351</option>
            <option value="CPSC 362">CPSC 362</option>
            <option value="CPSC 471">CPSC 471</option>
            <option value="CPSC 481">CPSC 481</option>
            <option value="CPSC 490">CPSC 490</option>
            <option value="CPSC 491">CPSC 491</option>
        </select><br><br>
        
        <label for="difficulty_level">Difficulty Level:</label>
        <select id="difficulty_level" name="difficulty_level" required>
            <option value="">Select difficulty</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
            <option value="6">6</option>
            <option value="7">7</option>
            <option value="8">8</option>
            <option value="9">9</option>
            <option value="10">10</option>
        </select><br><br>
        
        <label for="current_grade">Current Grade:</label>
        <input type="number" id="current_grade" name="current_grade" required><br><br>
        
        <label for="actual_study_hours">Study Hours:</label>
        <input type="number" id="actual_study_hours" name="actual_study_hours" required><br><br>
        
        <button type="submit">Submit</button>
    </form>

    <p id="responseMessage"></p>

    <script>
        document.getElementById('contactForm').addEventListener('submit', function(event) {
            event.preventDefault();

            const courseName = document.getElementById('course_name').value;
            const difficultyLevel = document.getElementById('difficulty_level').value;
            const currentGrade = parseInt(document.getElementById('current_grade').value);
            const studyHours = parseInt(document.getElementById('actual_study_hours').value);

            const data = {
                course_name: courseName,
                difficulty_level: difficultyLevel,
                current_grade: currentGrade,
                actual_study_hours: studyHours
            };

            fetch('http://localhost:5000/add_course_data', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            })
            .then(response => response.json())
            .then(data => {
                document.getElementById('responseMessage').innerText = data.Messsage || data.error;
            })
            .catch((error) => {
                console.error('Error:', error);
                document.getElementById('responseMessage').innerText = 'An error occurred while submitting the data.';
            });
        });
    </script>
</body>
</html>
