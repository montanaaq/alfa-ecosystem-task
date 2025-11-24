import { Button } from "@/components/ui/button";
import { Link } from "react-router";

const App = () => {
  return (
    <div className='flex justify-center w-full h-screen items-center flex-col gap-6'>
      <h1 className='text-lg font-semibold'>
        Hi! It is the test task for Alfa Ecosystem
      </h1>
      <Button variant={"default"} size={"lg"} asChild>
        <Link to='/products'>Go to products</Link>
      </Button>
    </div>
  );
};

export default App;
