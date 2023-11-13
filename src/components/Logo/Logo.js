import Tilt from 'react-parallax-tilt';
import './Logo.css';
import brain from './brain-100.png';


const Logo = () => {
    return (
        <div className='flex ma4 mt0'>
            <Tilt className='Tilt br2 shadow-2'>
                <div className='Tilt-inner pa3'>
                    <img style={{paddingTop: '5px'}} src={brain} alt='brain' />
                </div>            
            </Tilt>  
        </div>                
    );
};

export default Logo;