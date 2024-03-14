import '../style/About.css';
import imgAbout from '../image/imgAbout.png'

const About=()=>{

    return(
    <>
        <div className='main-container-about'>
            <p className='text-about'>Developed using JavaScript and React, our app offers a seamless experience for managing your tasks. Easily add, delete, and edit todos, and mark them as complete when you're done.
            Stay on top of your goals with our intuitive and efficient Todo List App!</p>
            <div className='picture-container'>
            <img  className='myimage' src={imgAbout} alt="imgAbout" />
        </div>
        </div>
    </>)
}

export default About;