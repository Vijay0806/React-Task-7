import './App.css';
import { Route, Routes, useNavigate, useParams } from 'react-router-dom';
import { FormField } from 'semantic-ui-react';
import { Form, Table } from 'semantic-ui-react';
import axios from 'axios';
import { useFormik } from 'formik';
import { Button} from '@mui/material';
import * as yup from 'yup';
import { useEffect, useState } from 'react';

import Navbar from './Navbar';

const API_URL="https://6481aa5329fa1c5c5031d568.mockapi.io/library"

function App() {
  const navigate = useNavigate();
  // const vm = {
  //   marginLeft: "auto"
  // }

return (
  <div className="App">
   
      <Navbar/>

    {/* <h1>Library Management</h1> */}
    <Routes>
      <Route path='/' element={<Home/>}></Route>
      <Route path='/create' element={<Create />}> </Route>
      <Route path='/read' element={<Read />}>
    </Route><Route path='/update/:id' element={<Edit />}></Route>
    
    </Routes>
  </div>
);
}

const movieValidationShema = yup.object({
  bookName: yup.string().required().min(3),
  bookNumber: yup.number().required().min(3),
  author: yup.string().required().min(0).max(25),
  isAvailable: yup.string().required().max(3),
  borrowMember: yup.string().required().min(1),
  borrowDate: yup.string().required().min(1),
})

function Home(){
  return(
    <div className='home__page'>
       <h1 style={{margin:"15px"}} color='red'>LIBRARY MANAGEMENT</h1>
  {/* <h1>LIBRARY MANAGEMENT</h1> */}
    </div>
    )
  }

  function Create() {

    const { handleSubmit, values, handleChange, handleBlur, touched, errors } =
      useFormik({
        initialValues: {
          bookName: "",
          bookNumber: "",
          author: "",
          isAvailable: "",
          borrowMember: "",
          borrowDate: "",
        },
        validationSchema: movieValidationShema,
        onSubmit: (newData) => {
          // console.log("Form values:", newData);
          openData(newData);
        },
      });
    const openData = (newData) => {
      fetch(API_URL, {
        method: "POST",
        body: JSON.stringify(newData),
        headers: { "Content-type": "application/json" },
      }).then(() => navigate('/read'));
    }
    const navigate = useNavigate();
    
  
    return (
      <div className='create_books'>
      <h2 style={{margin:"15px"}}>ADD THE NEW BOOKS</h2>
      <Form onSubmit={handleSubmit}>
        <FormField >
          <label className='labels'>BookName</label>
          <input className='input_value' placeholder='enter the bookname' name='bookName' value={values.bookName} onChange={handleChange} onBlur={handleBlur} /><br></br>
        </FormField>
        {touched.bookName && errors.bookName ? errors.bookName : null}
        <FormField>
          <label className='labels'>Book Number</label>
          <input className='input_value' placeholder='enter the booknumber' name='bookNumber' value={values.bookNumber} onChange={handleChange} onBlur={handleBlur} /><br></br>
        </FormField>
        {touched.bookNumber && errors.bookNumber ? errors.bookNumber : null}
        <FormField>
          <label className='labels'>Author</label>
          <input className='input_value' placeholder='enter the author ' name='author' value={values.author} onChange={handleChange} onBlur={handleBlur} /><br></br>
        </FormField>
        {touched.author && errors.author ? errors.author : null}
        <FormField>
          <label className='labels'>IsAvailable</label>
          <input className='input_value' placeholder='enter Yes or No' name='isAvailable' value={values.isAvailable} onChange={handleChange} onBlur={handleBlur} /><br></br>
        </FormField>
        {touched.isAvailable && errors.isAvailable ? errors.isAvailable : null}
        <FormField>
          <label className='labels'>BorrowMember name</label>
          <input className='input_value' placeholder='enter the name' name='borrowMember' value={values.borrowMember} onChange={handleChange} onBlur={handleBlur} /><br></br>
        </FormField>
        {touched.borrowMember && errors.borrowMember ? errors.borrowMember : null}
        <FormField>
          <label className='labels'>Borrow Date</label>
          <input className='input_value' placeholder='enter the date' name='borrowDate' value={values.borrowDate} onChange={handleChange} onBlur={handleBlur} /><br></br>
        </FormField>
        {touched.borrowDate && errors.borrowDate ? errors.borrowDate : null}<br></br>
        <Button id="button" type="submit" > Submit</Button>
      </Form>
      </div>
    )
  }  
  function Read() {
    const navigate = useNavigate();
    const [apiData, setAPIData] = useState([]);
    const updateUser = ({ bookName, bookNumber, author, borrowMember, isAvailable, borrowDate, id }) => {
      localStorage.setItem("id", id);
      localStorage.setItem("bookName", bookName);
      localStorage.setItem("bookNumber", bookNumber);
      localStorage.setItem("author", author);
      localStorage.setItem("borrowMember", borrowMember);
      localStorage.setItem("isAvailable", isAvailable);
      localStorage.setItem("borrowDate", borrowDate);
      navigate(`/update/${id}`)
    }
  
    const callGetAPI = async () => {
      const res = await axios.get(API_URL);
      setAPIData(res.data);
    }
    const deleteUser = async (id) => {
      await axios.delete(API_URL + "/" + id)
      callGetAPI();
    }
    useEffect(() => {
      callGetAPI();
    }, []);
    return (
      <>
     <h2 style={{margin:"15px"}}>ALL BOOKS DETAILS</h2>
      <div className='read'>
        <Table singleLine>
          <Table.Header >
            <Table.Row >
              <Table.HeaderCell> Book Name</Table.HeaderCell>
              <Table.HeaderCell>Book Number</Table.HeaderCell>
              <Table.HeaderCell>Author</Table.HeaderCell>
              <Table.HeaderCell>Is Available</Table.HeaderCell>
              <Table.HeaderCell>BorrowMember</Table.HeaderCell>
              <Table.HeaderCell>BorrowDate</Table.HeaderCell>
              <Table.HeaderCell>Delete</Table.HeaderCell>
              <Table.HeaderCell>Update</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {
              apiData.map(data => (
  
                <Table.Row key={data.id}>
                  <Table.Cell>{data.bookName}</Table.Cell>
                  <Table.Cell>{data.bookNumber}</Table.Cell>
                  <Table.Cell>{data.author}</Table.Cell>
                  <Table.Cell>{data.isAvailable}</Table.Cell>
                  <Table.Cell>{data.borrowMember}</Table.Cell>
                  <Table.Cell>{data.borrowDate}</Table.Cell>
                  <Table.Cell><Button onClick={() =>
                    deleteUser(data.id)} style={{color:"white"}}>Delete</Button></Table.Cell>
                  <Table.Cell><Button onClick={() =>
                    updateUser(data)} style={{color:"white"}}>Update</Button></Table.Cell>
  
                </Table.Row>
              ))
            }
          </Table.Body>
        </Table>
      </div>
      </>
    )
  }
  export function Edit() {
    const { id } = useParams();
    const [details, setDetails] = useState(null);
    useEffect(() => {
       fetch(`https://6481aa5329fa1c5c5031d568.mockapi.io/library${id}`,{
      //fetch(`https://638cafbcd2fc4a058a5d556b.mockapi.io/library/${id}`, {
        method: "GET",
      })
        .then((data) => data.json())
        .then((mv) => setDetails(mv));
    }, []);
  
     console.log(details)
  
    return <div>{details ? <Update details={details} /> : "Loading..."}</div>
  }
  function Update({ details }) {

    const { handleSubmit, values, handleChange, handleBlur, touched, errors } =
      useFormik({
        initialValues: {
          bookName: details.bookName,
          bookNumber: details.bookNumber,
          author: details.author,
          isAvailable: details.isAvailable,
          borrowMember: details.borrowMember,
          borrowDate: details.borrowDate,
        },
        validationSchema: movieValidationShema,
        onSubmit: (update) => {
           console.log("Form values:", update);
          updateUser(update);
        },
      });
  
    const navigate = useNavigate();
    
    const updateUser = (update)=>{
      fetch(`https://6481aa5329fa1c5c5031d568.mockapi.io/library${details.id}`,{
        method:"PUT",
        body:JSON.stringify(update),
        headers:{"Content-type":"application/json"},
      }).then(()=>navigate("/read"));
      // navigate("/read")
    };
    return (
      <>
         <h2 style={{margin:"15px"}}>EDIT THE BOOK DETAILS</h2>
      <Form onSubmit={handleSubmit}>
        <FormField>
          <label className='labels'>BookName</label>
          <input className='input_value' placeholder='enter the bookname' name='bookName' value={values.bookName} onChange={handleChange} onBlur={handleBlur} /><br></br>
        </FormField>
        
        {touched.bookName && errors.bookName ? errors.bookName : null}
        <FormField>
          <label className='labels'>Book Number</label>
          <input className='input_value' placeholder='enter the booknumber' name='bookNumber' value={values.bookNumber} onChange={handleChange} onBlur={handleBlur} /><br></br>
        </FormField>
        {touched.bookNumber && errors.bookNumber ? errors.bookNumber : null}
        <FormField>
          <label className='labels'>Author</label>
          <input className='input_value' placeholder='enter the author ' name='author' value={values.author} onChange={handleChange} onBlur={handleBlur} /><br></br>
        </FormField>
        {touched.author && errors.author ? errors.author : null}
        <FormField>
          <label className='labels'>IsAvailable</label>
          <input className='input_value' placeholder='enter the state' name='isAvailable' value={values.isAvailable} onChange={handleChange} onBlur={handleBlur} /><br></br>
        </FormField>
        {touched.isAvailable && errors.isAvailable ? errors.isAvailable : null}
        <FormField>
          <label className='labels'>BorrowMember name</label>
          <input className='input_value' placeholder='enter the name' name='borrowMember' value={values.borrowMember} onChange={handleChange} onBlur={handleBlur} /><br></br>
        </FormField>
        {touched.borrowMember && errors.borrowMember ? errors.borrowMember : null}
        <FormField>
          <label className='labels'>Borrow Date</label>
          <input className='input_value' placeholder='enter the date' name='borrowDate' value={values.borrowDate} onChange={handleChange} onBlur={handleBlur} /><br></br>
        </FormField>
        {touched.borrowDate && errors.borrowDate ? errors.borrowDate : null}<br></br>
        <Button id="button" type="submit" > Submit</Button>
      </Form>
      </>
    )
  }

  export default App;