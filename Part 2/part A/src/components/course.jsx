const Course = ({course}) => {
    const Header = ({course}) => {
        return (
            <div>
                <h1>{course.name}</h1>
            </div>
        );
    };

    const Part = ({name, exercises}) => {
        return (
            <p>
                {name} {exercises}
            </p>
        );
    };
    const Content = ({parts}) => {
        return (
            <div>
                {parts.map((part) => (
                    <Part
                        key={part.id}
                        name={part.name}
                        exercises={part.exercises}
                    />
                ))}
            </div>
        );
    };
    const Total = ({parts}) => {
        const totalExercises = parts.reduce(
            (sum, part) => sum + part.exercises,
            0,
        );
        return (
            <p>
                <b>total of {totalExercises} exercises</b>{' '}
            </p>
        );
    };
    return (
        <div>
            {course.map((aine) => (
                <div key={aine.id}>
                    <Header course={aine} />
                    <Content parts={aine.parts} />
                    <Total parts={aine.parts} />
                </div>
            ))}
        </div>
    );
};

export default Course;
