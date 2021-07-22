import NavigationBar from "../components/NavigationBar/NavigationBar";

function RegularLayout({ children }) {
  return (
    <>
      <NavigationBar />
      {children}
    </>
  );
}

export default RegularLayout;
