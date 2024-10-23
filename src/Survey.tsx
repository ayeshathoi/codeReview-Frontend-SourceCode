import { useState, ChangeEvent, FormEvent } from 'react';
import { addreview,viewData } from './apiCalls';
import Header from './Header';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Instruction from './Instruction';
import {
  Typography,
  TextField,
  Card,
  Rating,
} from '@mui/material';



import Button from '@mui/material/Button';



function Survey() {
    
    const [formData, setFormData] = useState<{
        data_id: number;
        gold : string;
        summary : string;
        // model outputs
        codereviewer : string;
        codellama : string;
        gemini : string;
        gpt_3_5 : string;
        gpt_3_5_both : string;
        gpt_3_5_cg : string;
        gpt_3_5_sum : string;
        llama2 : string;
        llama3 : string;

        // --------------------

        patch_file : string;
        name: string;
        organization: string;
        proj: string;
        lang: string;
        comment: string;
        model_information_score : number[];
        model_relevance_score : number[];
        model_explanation_clarity_score : number[],
    }>({
        data_id: -1,
        gold : '',
        summary : '',
        // --------------------
        codereviewer : '',
        codellama : '',
        gemini : '',
        gpt_3_5 : '',
        gpt_3_5_both : '',
        gpt_3_5_cg : '',
        gpt_3_5_sum : '',
        llama2 : '',
        llama3 : '',
        // --------------------
        patch_file : '',
        name: '',
        organization: '',
        proj: '',
        lang: '',
        comment: '',
        model_information_score : [],
        model_relevance_score : [],
        model_explanation_clarity_score : [],
    });

    const fillForm = async () => {
      
        const res = await viewData(formData.lang).then((res) => {
          console.log(res.data_id);
          setFormData({ ...formData, 
            data_id: res.data_id,
            summary : res.summary,
            gold: res.gold,
            // model outputs
            codereviewer: res.codereviewer,
            codellama: res.codellama,
            gemini: res.gemini,
            gpt_3_5: res.gpt_3_5,
            gpt_3_5_both: res.gpt_3_5_both,
            gpt_3_5_cg: res.gpt_3_5_cg,
            gpt_3_5_sum: res.gpt_3_5_sum,
            llama2: res.llama2,
            llama3: res.llama3,
            // --------------------

            patch_file: res.patch,
            
          });
        });
      
    };
    var model_names = ['codereviewer', 'gpt_3_5_cg', 'codellama', 'gpt_3_5_both', 'gpt_3_5'];
    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        if (!formData.name || !formData.organization) {
          alert("Please fill all the fields");
          return;
        }
        e.preventDefault();
        
        try {

          const dataToSend = {
            name: formData.name,
            organization: formData.organization,
            model : model_names,
            data_id: formData.data_id,
            information : formData.model_information_score,
            relevance: formData.model_relevance_score,
            explanation_clarity: formData.model_explanation_clarity_score,
            comment: formData.comment,
          };
          await addreview(dataToSend);
          
          // Show a success message
          alert("Data has been submitted successfully");

          window.location.replace("https://ayeshathoi.github.io/codeReview/");
      

        } catch (err) {
          console.log(err);
        }

        formData.data_id = -1;
        formData.gold = '';
        formData.patch_file = '';
        formData.model_information_score = [];
        formData.model_relevance_score = [];
        formData.model_explanation_clarity_score = [];
        formData.comment = '';
        formData.proj = '';
        fillForm();
      };


    return (
        <>
        <div>
            <Header />
        </div>
        <div style={{padding: '15px 7px 5px 70px'}}>
          <div>
            <div className="side-nav-item">
            <div style={{ display: 'flex', flexDirection: 'row'}}>
                <div style={{ flex: 1 }}>
                    <TextField 
                        id="outlined-basic" 
                        label="Your Email ID" 
                        variant="outlined"
                        value={formData.name}
                        onChange={(e) =>{
                            setFormData({ ...formData, name: e.target.value })
                        }}
                    />
                </div>
                <div style={{ flex: 1 }}>
                    <TextField 
                        id="outlined-basic" 
                        label="Your organization" 
                        variant="outlined"
                        value={formData.organization}
                        onChange={(e) =>
                            setFormData({ ...formData, organization: e.target.value })
                        }
                    />
                </div>
                </div>

                <div style={{ display: 'flex', flexDirection: 'row', marginTop: '10px'}}>

                <select
                  name="lang"
                  id="lang"
                    className="p-2 border-2 rounded-lg bg-white text-blue-500"
                  value={formData.lang}
                  onChange={(e: ChangeEvent<HTMLSelectElement>) =>{
                        // setFormData({ 
                        //     ...formData, 
                        //     lang: e.target.value
                        // })
                        formData.lang = e.target.value;
                        fillForm();
                  }}
                >
                  <option value="">Select your preferred language</option>
                  <option value="py">Python</option>
                  <option value="java">Java</option>
                  <option value="js">Javascript</option>
                  <option value="cpp">C++</option>
                  <option value="c">C</option>
                  <option value=".cs">C#</option>
                  <option value="go">Go</option>
                  <option value="php">PHP</option>
                  <option value="rb">Ruby</option>
                </select>
                </div>
                </div>
                </div>
                </div>

                {/* Code Summary */}


                
                
                <div style={{padding: '15px 7px 5px 70px'}}>
                <h2>Code Summary</h2> 
                <div style={{ flex: 1, width: '90%'}}>
                
                      <Card style={{padding: '15px 7px 5px 70px'}}>
                            <Typography 
                            style={{overflow: 'scroll', whiteSpace: 'pre-wrap'

                            }}>
                      
                      <div style={{ textWrap: 'wrap'                            
                              }}>
                          {formData.summary}
                          </div>
                            </Typography>
                        </Card>
                    </div>
                </div>


               
                <div style={{padding: '15px 7px 5px 70px'}}>
                <h2>Code Snippet</h2> 
                    <div style={{ flex: 1, width: '90%'}}>
                    
                    <Card style={{padding: '15px 7px 5px 70px'}}>
                            <Typography 
                            style={{overflow: 'scroll', whiteSpace: 'pre-wrap'

                            }}>
                              <div style={{ textWrap: 'wrap'                            
                              }}>
                              <pre>
                                {formData.patch_file}
                                </pre>
                                </div>
                            </Typography>
                        </Card>
                    </div>
                   
                </div>

                
                <div style={{padding: '15px 7px 5px 70px'}}>
                <h2> Ground Truth</h2> 
                <div style={{ flex: 1, width: '90%'}}>
                <Card style={{padding: '15px 7px 5px 70px'}}>
                            <Typography 
                            style={{overflow: 'scroll', whiteSpace: 'pre-wrap'

                            }}>
                               <div style={{ textWrap: 'wrap'                            
                              }}>
                                {formData.gold}
                                </div>
                            </Typography>
                        </Card>
                    </div>
                   
                </div>

                <div style={{padding: '15px 7px 5px 70px'}}>
                <br /> <br />
                <h3>
                Rate the model's output using the respective metrics on a scale from 1 to 5 <br /> <br />
                1 : Very bad , 2 : bad, 3 : Neutral , 4 : Good  , 5 : Very Good
                </h3>
                </div>
                <br />
                <br />

                <div style={{padding: '15px 7px 5px 70px'}}>
                 {/* make the table wider */}
                      
                
                {/* Add padding */}
                 <table style={{width: "90%" , border : "1px solid black"}}>
                   <thead>
                     <tr>
                      {/*  var model_names = ['codereviewer', 
                      'codellama', 'gemini', 'gpt_3_5', 'gpt_3_5_both', 
                      'gpt_3_5_cg', 'gpt_3_5_sum', 'llama2', 'llama3']; */}
                      
                       <th style={{width: "80%" , border : "1px solid black", textAlign: "center"}}> 
                        Generated Output </th>
                      <th style={{width: "80%" , border : "1px solid black", textAlign: "center"}}>  
                        Relevance Score </th>
                        <th style={{width: "80%" , border : "1px solid black", textAlign: "center"}}>  
                        Information Score </th>
                      <th style={{width: "80%" , border : "1px solid black", textAlign: "center"}}> 
                        Explanation Clarity Score </th>
                     </tr>
                   </thead>
                   <tbody>
                     <tr>
                      
                     {/* Write a for loop using model's output */}
                     

                      <td style={{width: "80%" , border : "1px solid black", textAlign: "center"}}>
                        <div className='word-wrap'>

                        {formData.codereviewer}
                        </div>
                        
                      
                      </td>
                      <td style={{width: "80%" , border : "1px solid black", textAlign: "center"}}>
                      <Rating
                      name="model_relevance_score[0]"
                      value={formData.model_relevance_score[0]}
                      onChange={(event, newValue) =>
                          setFormData({ ...formData, model_relevance_score: [newValue, ...formData.model_relevance_score.slice(1)] })
                      }
                      />
                      </td>
                      <td style={{width: "80%" , border : "1px solid black", textAlign: "center"}}>
                      <Rating
                      name="model_information_score[0]"
                      value={formData.model_information_score[0]}
                      onChange={(event, newValue) =>
                          setFormData({ ...formData, model_information_score: [newValue, ...formData.model_information_score.slice(1)] })
                      }
                      />
                      </td>
                      <td style={{width: "80%" , border : "1px solid black", textAlign: "center"}}>
                      <Rating
                      name="model_explanation_clarity_score[0]"
                      value={formData.model_explanation_clarity_score[0]}
                      onChange={(event, newValue) =>
                          setFormData({ ...formData, model_explanation_clarity_score: [newValue, ...formData.model_explanation_clarity_score.slice(1)] })
                      }
                      />
                      </td>
                      </tr>
                      

                      {/* gpt_3_5_cg */}
                      <tr>

                      <td style={{width: "80%" , border : "1px solid black", textAlign: "center"}}>
                        <div className='word-wrap'>

                        {formData.gpt_3_5_cg}
                        </div>
                        
                      
                      </td>
                      <td style={{width: "80%" , border : "1px solid black", textAlign: "center"}}>
                      <Rating
                      name="model_relevance_score[1]"
                      value={formData.model_relevance_score[1]}
                      onChange={(event, newValue) =>
                          setFormData({ ...formData, model_relevance_score: [formData.model_relevance_score[0], newValue, ...formData.model_relevance_score.slice(2)] })
                      }
                      />
                      </td>
                      <td style={{width: "80%" , border : "1px solid black", textAlign: "center"}}>
                      <Rating
                      name="model_information_score[1]"
                      value={formData.model_information_score[1]}
                      onChange={(event, newValue) =>
                          setFormData({ ...formData, model_information_score: [formData.model_information_score[0], newValue, ...formData.model_information_score.slice(2)] })
                      }
                      />
                      </td>
                      <td style={{width: "80%" , border : "1px solid black", textAlign: "center"}}>
                      <Rating
                      name="model_explanation_clarity_score[1]"
                      value={formData.model_explanation_clarity_score[1]}
                      onChange={(event, newValue) =>
                          setFormData({ ...formData, model_explanation_clarity_score: [formData.model_explanation_clarity_score[0], newValue, ...formData.model_explanation_clarity_score.slice(2)] })
                      }
                      />
                      </td>
                      </tr>

                      {/* Codellama */}
                      <tr>
                      <td style={{width: "80%" , border : "1px solid black", textAlign: "center"}}>
                        <div className='word-wrap'>

                        {formData.codellama}
                        </div>

                      </td>
                      <td style={{width: "80%" , border : "1px solid black", textAlign: "center"}}>
                      <Rating
                      name="model_relevance_score[2]"
                      value={formData.model_relevance_score[2]}
                      onChange={(event, newValue) =>
                          setFormData({ ...formData, model_relevance_score: [formData.model_relevance_score[0], formData.model_relevance_score[1], newValue, ...formData.model_relevance_score.slice(3)] })
                      }
                      />
                      </td>
                      <td style={{width: "80%" , border : "1px solid black", textAlign: "center"}}>
                      <Rating
                      name="model_information_score[2]"
                      value={formData.model_information_score[2]}
                      onChange={(event, newValue) =>
                          setFormData({ ...formData, model_information_score: [formData.model_information_score[0], formData.model_information_score[1], newValue, ...formData.model_information_score.slice(3)] })
                      }
                      />
                      </td>
                      <td style={{width: "80%" , border : "1px solid black", textAlign: "center"}}>
                      <Rating
                      name="model_explanation_clarity_score[2]"
                      value={formData.model_explanation_clarity_score[2]}
                      onChange={(event, newValue) =>
                          setFormData({ ...formData, model_explanation_clarity_score: [formData.model_explanation_clarity_score[0], formData.model_explanation_clarity_score[1], newValue, ...formData.model_explanation_clarity_score.slice(3)] })
                      }
                      />
                      </td>
                      </tr>

                      {/* GPT_3_5_Both */}
                      <tr>
                      <td style={{width: "80%" , border : "1px solid black", textAlign: "center"}}>
                        <div className='word-wrap'>

                        {formData.gpt_3_5_both}
                        </div>
                      </td>

                      <td style={{width: "80%" , border : "1px solid black", textAlign: "center"}}>
                      <Rating
                      name="model_relevance_score[3]"
                      value={formData.model_relevance_score[3]}
                      onChange={(event, newValue) =>
                          setFormData({ ...formData, model_relevance_score: [formData.model_relevance_score[0], formData.model_relevance_score[1], formData.model_relevance_score[2], newValue, ...formData.model_relevance_score.slice(4)] })
                      }
                      />
                      </td>
                      <td style={{width: "80%" , border : "1px solid black", textAlign: "center"}}>
                      <Rating
                      name="model_information_score[3]"
                      value={formData.model_information_score[3]}
                      onChange={(event, newValue) =>
                          setFormData({ ...formData, model_information_score: [formData.model_information_score[0], formData.model_information_score[1], formData.model_information_score[2], newValue, ...formData.model_information_score.slice(4)] })
                      }
                      />
                      </td>
                      <td style={{width: "80%" , border : "1px solid black", textAlign: "center"}}>
                      <Rating
                      name="model_explanation_clarity_score[3]"
                      value={formData.model_explanation_clarity_score[3]}
                      onChange={(event, newValue) =>
                          setFormData({ ...formData, model_explanation_clarity_score: [formData.model_explanation_clarity_score[0], formData.model_explanation_clarity_score[1], formData.model_explanation_clarity_score[2], newValue, ...formData.model_explanation_clarity_score.slice(4)] })
                      }
                      />
                      </td>
                      </tr>

                      {/* GPT_3_5_without */}
                      <tr>
                      <td style={{width: "80%" , border : "1px solid black", textAlign: "center"}}>
                        <div className='word-wrap'>

                        {formData.gpt_3_5}
                        </div>
                      </td>
                      <td style={{width: "80%" , border : "1px solid black", textAlign: "center"}}>
                      <Rating
                      name="model_relevance_score[4]"
                      value={formData.model_relevance_score[4]}
                      onChange={(event, newValue) =>
                          setFormData({ ...formData, model_relevance_score: [formData.model_relevance_score[0], formData.model_relevance_score[1], formData.model_relevance_score[2], formData.model_relevance_score[3], newValue] })
                      }
                      />
                      </td>
                      <td style={{width: "80%" , border : "1px solid black", textAlign: "center"}}>
                      <Rating
                      name="model_information_score[4]"
                      value={formData.model_information_score[4]}
                      onChange={(event, newValue) =>
                          setFormData({ ...formData, model_information_score: [formData.model_information_score[0], formData.model_information_score[1], formData.model_information_score[2], formData.model_information_score[3], newValue] })
                      }
                      />
                      </td>
                      <td style={{width: "80%" , border : "1px solid black", textAlign: "center"}}>
                      <Rating
                      name="model_explanation_clarity_score[4]"
                      value={formData.model_explanation_clarity_score[4]}
                      // remove after submission the yellow color
                      onChange={(event, newValue) =>
                          setFormData({ ...formData, model_explanation_clarity_score: [formData.model_explanation_clarity_score[0], formData.model_explanation_clarity_score[1], formData.model_explanation_clarity_score[2], formData.model_explanation_clarity_score[3], newValue] })
                      }
                      
                      
                      />
                      </td>
                      </tr>



                   </tbody>
                 </table>
               </div>






               

                

                

            
            <div style = {{padding: '15px 7px 5px 70px',display: 'flex', width : '85%',
                    justifyContent: 'center', 
                    alignItems: 'center',  }}>
              <TextField
                label="What will you suggest to be commented on this patch file?"
                name="comment"
                type="text"
                value={formData.comment}
                onChange={(e) =>
                  setFormData({ ...formData, comment: e.target.value })
                }
                variant="outlined"
                required
                fullWidth
              />
            </div>

               
                

                <div 
                style={{
                    display: 'flex', 
                    justifyContent: 'center', 
                    alignItems: 'center', 
                    height: '10vh' // Full viewport height
                }}
                >


                <form onSubmit={handleSubmit}> 
                <Button
                variant="contained"
                color="primary"
                type="submit"
                className="mt-4"
                >

                Submit
                </Button>
                </form>
                </div>

                <br />
                
                
                
      
        </>

    );
}

export default Survey;
