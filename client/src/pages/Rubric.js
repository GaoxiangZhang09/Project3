import RubricAlert from "../components/RubricAlert/RubricAlert"

function Rubric() {
  return (
    <div>
      <h1>BPQ-331</h1>
      <div className="row">
        <div className="col-12">
          <h2>
            Welcome to BPQ-331! <br/>
            This page is for TA and John grade using <br/>
          </h2>
        </div>
        <div>
          <RubricAlert id={0} msg={"Check here:    https://docs.google.com/document/d/1tqy1tNADoKdp11se8rgJYNIq1UeA40SFCziXdmGF6Cg/edit"}/>
          <RubricAlert id={1} msg={"We think it's accomplish"}/>
          <RubricAlert id={2} msg={"It's useful! Instruciton on the home page!"}/>
          <RubricAlert id={3} msg={"This site is open source and easy to use"}/>
          <RubricAlert id={4} msg={"Yes, eslint included! No errors!"}/>
          <RubricAlert id={5} msg={"We have different files for components, like Home, HomeHitory ect..., css in folders, Database file separate"}/>
          <RubricAlert id={6} msg={"We have used almost 10 hooks, includes useState, useEffect, code in files like Home.js, HomeHistoryItem.js"}/>
          <RubricAlert id={7} msg={"Yes, Each React Component is saved into its own file!"}/>
          <RubricAlert id={8} msg={"Yes, we deploye frontend and backend in two public server and they work there?"}/>
          <RubricAlert id={9} msg={"Yes, it use 2 Mongo Collections, supporting CRUD operations on them, which is DB for mint(Home page), and DB for addfriend(NewCommu page) "}/>
          <RubricAlert id={10} msg={"Yes, both collections include at least 1k synthetic records"}/>
          <RubricAlert id={11} msg={"Yes, we use them for backend"}/>
          <RubricAlert id={12} msg={"Sure, who dare not listen to John LOL"}/>
          <RubricAlert id={13} msg={"No non-standard html tags"}/>
          <RubricAlert id={14} msg={"Yes, all css files with Component"}/>
          <RubricAlert id={15} msg={"How to say, we think our Readme is good enough!"}/>
          <RubricAlert id={16} msg={"Yes, we have build!"}/>
          <RubricAlert id={17} msg={"We are not sure yet! We deploye backend and frontend sperately"}/>
          <RubricAlert id={18} msg={"Sure, it's basic one!"}/>
          <RubricAlert id={19} msg={"Sure, MIT license included"}/>
          <RubricAlert id={20} msg={"We have checked, no leftover, lefts are all important comments!"}/>
          <RubricAlert id={21} msg={"Not google yet, but will be all right!"}/>
          <RubricAlert id={22} msg={"Not record yet, but will be all right!"}/>
          <RubricAlert id={23} msg={"Yes, frozen on time!"}/>
          <RubricAlert id={24} msg={"We Defines PropTypes for where we use props"}/>
          <RubricAlert id={25} msg={"NO NO NO NO NO!"}/>
          <RubricAlert id={26} msg={"YES!"}/>
          <RubricAlert id={27} msg={"YES!"}/>
          <RubricAlert id={28} msg={"We love bonus!"}/>
        

          
        </div>
      </div>
    </div>
  );
}

export default Rubric;