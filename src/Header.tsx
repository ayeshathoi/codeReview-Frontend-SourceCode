import { Link } from 'react-router-dom';

const Navbar: React.FC = () => {
  return (
    <nav>
      <div style={{padding: '15px 7px 5px 70px', backgroundColor: 'cornflowerblue'}}>
        <div className="flex items-center w-5/6 mx-auto">
          <div>
            <Link to="/codeReview/" style={{textDecoration: 'none'}}>
              <span style={{color: '#f7fafc', fontSize: '1.5rem', fontWeight: 600, 

              }}>Instruction</span>              
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;

