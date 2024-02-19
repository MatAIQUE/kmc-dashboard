import Logo from "./logo";

const Header = () => {
  return (
    <header className="w-full bg-white dark:bg-gray-800 p-4 flex items-center justify-between">
      <div className="flex items-center">
        <div className="mr-4">
          <Logo />
        </div>
      </div>
    </header>
  );
};

export default Header;
