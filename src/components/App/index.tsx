import ScrollableVideo from '../ScrollableVideo';

function App() {
  return (
    <div>
      <ScrollableVideo speed={1}>
        <source
          type="video/mp4"
          src="/videos/test.mp4"
        />
      </ScrollableVideo>
    </div>
  );
}

export default App;
