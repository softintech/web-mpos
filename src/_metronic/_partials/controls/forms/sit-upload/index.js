import React from 'react'
import { Button, Card, Jumbotron, Modal, ProgressBar, InputGroup, FormControl, Image } from "react-bootstrap";
var count = 0;
var inTime;
export function Upload({
  field, // { name, value, onChange, onBlur }
  form: { touched, errors }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
  label,
  withFeedbackLabel = true,
  customFeedbackLabel,
  type = "text",
  tempfile,
  ...props
}) {
    let choose;
    const [state,setState]=React.useState({
        fname:'',
        fobj:'',
        now:0
    })
    function handleClick(e){
        if(inTime!=undefined){
            clearTimeout(inTime)
            setState({
                ...state,
                fname:state.fname,
                fobj:state.fobj,
                now:0
            })
        }
        choose.click()
    }
    function handleChange(e){
        const [file] = e.target.files     
        if(file==undefined){

        }else{
            tempfile(file)
            setState({
                ...state,
                fname:file.name,
                fobj:URL.createObjectURL(file),
                now:0
            }) 
        }               
    }
    function handleUpload(e){
        if(state.fobj!=""){
            // upload
            count=10
            setState({
                ...state,
                fname:state.fname,
                fobj:state.fobj,
                now:count
            })
            inTime = setInterval(() => {
                setState({
                    ...state,
                    fname:state.fname,
                    fobj:state.fobj,
                    now:count+=20
                })
                if(count>80){
                    clearTimeout(inTime)
                }
            }, 1000);  
        }
    }

    return (
        
        <React.Fragment>
            <Jumbotron style={{overflowY:state.fobj==""?'':'scroll',msOverflowStyle:'none',height:'24em'}}>
                <span style={{display:'none'}}>
                    <input  {...field}
                            {...props} 
                            onChange={handleChange} ref={input => choose = input} id={field.name} type="file" accept=".png,.jpg,.jpeg"/>
                </span>
                {state.fobj==""
                ?<span  style={{height:'20em'}}>
                    <h1>ภาพประกอบ</h1>
                        <p>
                            เลือกรูปภาพที่ต้องการ
                            และกดอัพโหลด                            
                        </p>
                </span>
                :<Image src={state.fobj} thumbnail />    
                }
            </Jumbotron>
            <InputGroup>
                <FormControl
                        placeholder="Recipient's username"
                        aria-label="Recipient's username"
                        aria-describedby="basic-addon2"
                        readOnly={true}
                        value={state.fname}
                    />
                    <InputGroup.Append>
                        <Button onClick={handleUpload} variant="outline-secondary">อ๊ฟโหลด</Button>
                        <Button onClick={handleClick} variant="outline-secondary">เลือกรูปภาพ</Button>
                    </InputGroup.Append>
            </InputGroup>
            <span style={{display:state.now==0?'none':'block'}}>
                <ProgressBar striped variant="success" now={state.now}  />
            </span>
        </React.Fragment>

    )
}