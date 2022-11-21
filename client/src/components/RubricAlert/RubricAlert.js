function RubricAlert(props) {
  const rubricData = [
    ["Design document"],
    ["Does the app accomplish all the requirements approved in #project   15"],
    ["Is the app usable? Does it include instructions on how to be used?    5"],
    ["Is the app actually useful? Would a final user use it?    5"],
    [
      "The code includes an eslint config file and it doesn't throw any error    5"
    ],
    [
      "Is the code properly organized. Each react component in its own file. Database files separate, CSS into folders, etc.    5"
    ],
    ["Does it implement at least 3 React Components (using hooks)   15"],
    ["Each React Component is saved into its own file 15"],
    ["Is the project deployed on a public server? Does it work there?    10"],
    [
      "Does it use at least 2 Mongo Collections, supporting CRUD operations on them?. Each student implements full CRUD in at least one of them.   15"
    ],
    ["Is the database populated with at least 1k synthetic records?    10"],
    ["Does the app use node + express    5"],
    ["All the code is formatted using Prettier    5"],
    [
      "Doesn't use non standard html tags for accomplishing tasks that should be done with standard components? e.g. Buttons implemented with divs or spans    5"
    ],
    [
      "Is the CSS organized by components? The components that require styling should have their own css file with the same name of the component and loaded in the component's js file    5"
    ],
    [
      "Clear and descriptive README including at least: * Author * Class Link * Project Objective * Screenshot * Instructions to build    5"
    ],
    [
      "It doesn't expose any secret credentials such as the Mongo USER and Password    5"
    ],
    [
      "Does it include a package.json file for the backend and one for the frontend,  listing all the dependencies for each one    5"
    ],
    ["Does it use MIT license    5"],
    [
      "The project doesn't include leftover code that isn't used. e.g. routes/users.js or the default react faveicon    5"
    ],
    [
      "Is the google Form submission correct (thumbnail displays correctly, and links work as well)    5"
    ],
    [
      "Does it include a short public and narrated video demonstrating the application (each student present on it)     10"
    ],
    [
      "The code was frozen on time (24 hours before class). Video, slides and deployment were completed before class    5"
    ],
    ["Defines PropTypes for every React Collection 5"],
    ["Doesn't use axios, or Mongoose or any other prohibited library  -20"],
    [
      "There is 60% Milestone submitted to the google form with a Github repository with commits from both students by Nov 15th 2022        20"
    ],
    [
      "There is 80% Milestone submitted to the google form with a Github repository with commits from both students by Nov 22th 2022        20"
    ],
    ["Bonus points (optional): "]
  ];
  const propsId = props.id;
  const propsMsg = props.msg;

  function clickHandle() {
    alert(propsMsg);
  }

  return (
    <div>
      <a href="" onClick={clickHandle}>
        {rubricData[propsId]}
      </a>
    </div>
  );
}

RubricAlert.propTypes = {};

export default RubricAlert;