import { Link } from 'react-router-dom';

export default function Welcome() {
  return (
    <div >
      <h1 >Welcome to Goalpp</h1>
      <p >Your goal tracking journey starts here.</p>
      <Link to="/" >
        Go to Login →
      </Link>
    </div>
  );
}
