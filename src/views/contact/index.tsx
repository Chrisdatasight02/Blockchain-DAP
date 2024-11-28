import React, {FC} from "react";
import { useForm, ValidationError } from "@formspree/react";
import {AiOutlineClose} from "react-icons/ai";
import { notify } from "../../utils/notifications";

//INTERNAL IMPORT
import Branding from "../../components/Branding";


export const ContactView: FC = ({setOpenContact}) => {

  //FORM
  const [state, handleSubmit] = useForm("xovalnrk");
  if(state.succeeded){
    notify({
      type: "success",
      message: "Thanks for submitting your message will get get back to you",
    });
    setOpenContact(false);

  }

  //COMPONENT
const CloseModal = ()=> (
  <a onClick={()=> setOpenContact(false)} className="group mt-4 inline-flex h-10 w-10 items-center justify-center rounded-lg bg-white/20 backdrop-blur-2xl transition-all duration-500 hover:bg-blue-600/60">
    <i className="text-2xl text-white group-hover:text-white">
      <AiOutlineClose/>
    </i>
  </a>
); 


  return <>  
   

 
    <section className="flex w-full items-center py-6 px-0 lg:h-screen">
      <div className="container">
        <div className="bg-default-950/40 mx-auto max-w-5xl
         overflow-hidden rounded-2xl backdrop-blur-xl">
          <div className="grid gap-10 lg:grid-cols-2">
          {/*//FIRST*/}   
          < Branding image="img-16" 
          title=" To Bulid Solana Blockchain Market" 
          massege="Solana market place"/>
           {/*//SECOND*/} 
         
              <div className="lg:ps-0 flex h-full flex-col p-10">
              <div className="pb-10 ">
                <a className="flex">
                  <img src="assets/images/logo1.png" alt="logo" className="h-10"/>
                </a>
              </div>
              <div className="my-auto p-6 text-center">
                <h4 className="mb-4 text-2xl font-bold text-white">
                 Send email to us for more details
                </h4>
                <p className="text-default-300 mx-auto mb-5 max-w-sm">
                  send your email so that we can provide you more details
                </p>
               
                <div className="text-start">
                  <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                      <label htmlFor="email" className="text-base/normal text-default-200 mb-2 block font-semibold">
                      Email
                      </label>
                      <input type="email" id="email" name="email" 
                      className="border-default-200 block w-full rounded border-white/10 bg-transparent py-1.5 px-3 text-white/80
                       focus:border-white/25 focus:ring-transparent" 
                       placeholder="Email"/>
                    </div>
                    <ValidationError prefix="Email" field="email" errors={state.errors} className="border-default-200 relative block w-full rounded border-white/10 bg-transparent py-1.5 px-3 text-white/80
                       focus:border-white/25 focus:ring-transparent" 
                       placeholder="message"/>
                    <textarea name="message" id="message" rows="6" className="border-default-200 relative block w-full rounded border-white/10 bg-transparent py-1.5 px-3 text-white/80
                       focus:border-white/25 focus:ring-transparent" 
                       placeholder="Message"></textarea>
                    <ValidationError prefix="Messge" field="message" errors={state.errors} className="border-default-200 relative block w-full rounded border-white/10 bg-transparent py-1.5 px-3 text-white/80
                       focus:border-white/25 focus:ring-transparent" 
                       placeholder="message"/>
                    
                  
                  
                 
                <div className="mb-6 text-center">
                  <button  
                  type="submit"
                  disabled={state.submitting}
                  className="bg-primary-600/90 hover:bg-primary-600 group mt-5 inline-flex w-full 
                  items-center justify-center rounded-lg px-6 py-2 text-white 
                  backdrop-blur-2xl transition-all duration-500">
                    <span className="fw-bold">Send Message</span>
                  </button>
                  <CloseModal/>
                </div>
                </form>
                
                </div>
              </div>
            </div>

           
         
          </div>
        
        </div>
      </div>
    </section>
  

 
    </> 
};

 