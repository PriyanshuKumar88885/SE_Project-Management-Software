import IssueCard from "./issueCard";
const IssuePanel=(props)=>{
    return (
      <div className=" h-screen custom-sidebar-2 p-3 min-w-60 rounded-lg">
            <div className=" text-white font-normal  tracking-wider py-2 px-1 text-start font-sans justify-between  ">
              <div className="flex flex-row">
              <div className={` align-self-center mr-2 ${props.iconColor?props.iconColor:""}`}>
                {props.icon}
              </div>
              <div className="text-lg align-self-center mr-2">
                {props.statusName}
              </div>
              <div className="text-sm text-[#acacac] align-self-center mr-2">
                {props.issues.length}
              </div>
              </div>
              <div>
                
              </div>
            </div>
            <div className="flex flex-col overflow-y-auto panel-height shadow-2xl rounded-lg text-white p-1" style={{   overflowY: 'auto', scrollbarWidth: 'thin', scrollbarColor: 'rgba(0,0,0,0) rgba(0,0,0,0)' }}>
                {props.issues.length===0?"No Item Is Present Here":props.issues.map((issue) => (
                    <IssueCard key={issue.id} issue={issue} onMoveIssue={props.onMoveIssue} />
                ))}
            </div>
        </div>
    );
}
export default IssuePanel;