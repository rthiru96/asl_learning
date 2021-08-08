import React from "react";
import {
  Table,
  TableBody,
  Typography,
  TableRow,
  TableCell,
  withStyles,
  TableHead,
  Grid,
} from "@material-ui/core";
import { connect } from "react-redux";
import { compose, bindActionCreators } from "redux";
import Delete from "@material-ui/icons/Delete";
import * as teacherActions from "../../redux/actions/teacherActions";
import * as studentActions from "../../redux/actions/studentActions";
import { teacherStyle } from "./style";
import { toast } from "react-toastify";

class MessageView extends React.Component {
  constructor(props){
    super(props)
    this.state={
      teacher:[],
      students:[]
    }
  }
  async componentDidMount() {
    try {
  const teacher = await  this.props.teacherActions.getMessage();
  const students = await  this.props.studentActions.getStudent();
  this.setState({teacher,students});
    } catch (ex) {
      console.error(ex);
    }
  }

getName =(id)=>{
if(!!this.state.students?.length){
  let data = JSON.parse(JSON.stringify(this.state.students)).find((d)=> d.id===id )
  return data.username
}
return ""
}

delete= async(id)=>{

  try{
   await this.props.teacherActions.deleteMessage(id).then((dta)=>{
     if(!!dta.return){
    this.props.teacherActions.getMessage();
    return toast.success("delete successfully");
   }
   return toast.error("delete failed");
  })

  }catch(ex){console.error(ex)}
}

  render() {
    const { classes } = this.props;
    const { teacher } = this.state;
    console.log(teacher);
    return (
      <Grid item xs={8} className={classes.grid}>
        <form>
          <Table className={classes.table}>
            <TableHead>
              <TableRow>
                <TableCell>
                  <Typography className={classes.text}>Message Id</Typography>
                </TableCell>
                <TableCell>
                  <Typography className={classes.text}> Date</Typography>
                </TableCell>
                <TableCell>
                  <Typography className={classes.text}> Student Name</Typography>
                </TableCell>
                <TableCell>
                  <Typography className={classes.text}>Message</Typography>
                </TableCell>
                <TableCell>
                  <Typography className={classes.text}>Action</Typography>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {!!teacher?.length && teacher.map((t)=>
              {return<TableRow>
                <TableCell>{t.id}</TableCell>
                <TableCell>{t.created_on}</TableCell>
                <TableCell>{this.getName(t.student)}</TableCell>
                <TableCell>{t.message}</TableCell>
                <TableCell><Delete onClick={()=>{this.delete(t.id)}}/></TableCell>
              </TableRow>})}
            </TableBody>
          </Table>
        </form>
      </Grid>
    );
  }
}



const mapStateToProps = (state) => {
  return {};
};

function mapDispatchToProps(dispatch) {
  return {
    teacherActions: bindActionCreators(teacherActions, dispatch),
    studentActions:bindActionCreators(studentActions, dispatch),
  };
}

export default compose(
  withStyles(teacherStyle),
  connect(mapStateToProps, mapDispatchToProps)
)(MessageView);

