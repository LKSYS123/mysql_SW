import React, { useEffect, useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

import './App.css';

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
  createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
  createData('Eclair', 262, 16.0, 24, 6.0),
  createData('Cupcake', 305, 3.7, 67, 4.3),
  createData('Gingerbread', 356, 16.0, 49, 3.9),
];

function App() {
  const [backData, setBackData] = useState([{}]);
  const [postId, setPostId] = useState('');
  const [postTitle, setPostTitle] = useState('');
  const [postBody, setPostBody] = useState('');

  useEffect(() => {
    fetch('http://localhost:4000/api/posts', {
      headers: {
        'Accept': 'application/json'
      },
    })
      .then(
        response => response.json()
      ).then(
        data => {
          setBackData(data)
          console.log(data);
        }
      )
  }, [])

  const onChangeId = (e) => {
    setPostId(e.target.value)
  }

  const onChangeTitle = (e) => {
    setPostTitle(e.target.value)
  }

  const onChangeBody = (e) => {
    setPostBody(e.target.value)
  }

  let params = new URLSearchParams();
  params.append('id', postId);
  params.append('title', postTitle);
  params.append('body', postBody);

  const onSubmit = () => {
    fetch('http://localhost:4000/api/addPost', {
      headers: {
        'Accept': 'application/json'
      },
      method: 'POST',
      body: params,
      mode: 'cors',
    })
      .then(request => console.log(request))
      .then(response => response.json())
      .then(json => console.log(json))
      .catch(err => {
        console.log(err)
      })
    location.reload();
  }

  const onDelete = () => {
    fetch('http://localhost:4000/api/deletePost', {
      headers: {
        'Accept': 'application/json'
      },
      method: 'POST',
      body: params,
      mode: 'cors',
    })
      .then(request => console.log(request))
      .then(response => response.json())
      .then(json => console.log(json))
      .catch(err => {
        console.log(err)
      })
    location.reload();
  };

  const onUpdate = () => {
    fetch('http://localhost:4000/api/updatePost', {
      headers: {
        'Accept': 'application/json'
      },
      method: 'POST',
      body: params,
      mode: 'cors',
    })
      .then(request => console.log(request))
      .then(response => response.json())
      .then(json => console.log(json))
      .catch(err => {
        console.log(err)
      })
    location.reload();
  };

  return (
    <>
      <div style={{ width: 700, minHeight: 400, margin: 50 }}>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>id</TableCell>
                <TableCell align="right">title</TableCell>
                <TableCell align="right">body</TableCell>
                <TableCell align="right">publishedDate</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {backData.map((data) => (
                <TableRow key={data.name} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                  <TableCell component="th" scope="row">
                    {data.id}
                  </TableCell>
                  <TableCell align="right">{data.title}</TableCell>
                  <TableCell align="right">{data.body}</TableCell>
                  <TableCell align="right">{data.publishedDate}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
      <div className='formBox' style={{ margin: 50 }}>
        <form method='POST' action='http://localhost:4000/api/addPost'>
          <input type='text' title='id' name='id' placeholder='id id' onChange={onChangeId}></input>
          <input type='text' title='title' name='title' placeholder='title title' onChange={onChangeTitle}></input>
          <input type='text' title='body' name='body' placeholder='body body' onChange={onChangeBody}></input>
          <button type='button' onClick={onSubmit}>등록</button>
          <button type='button' onClick={onDelete}>삭제</button>
          <button type='button' onClick={onUpdate}>수정</button>
          {/* <button>등록</button> */}
        </form>
      </div>
    </>
  );
}

export default App;
