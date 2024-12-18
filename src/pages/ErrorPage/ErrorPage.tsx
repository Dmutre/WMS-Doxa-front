export const ErrorPage = () => {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        textAlign: 'center',
        color: '#333',
      }}
    >
      <h1>Oops!</h1>
      <p>Something went wrong.</p>
      <button
        onClick={() => (window.location.href = '/')}
        style={{
          padding: '10px 20px',
          backgroundColor: '#007BFF',
          color: '#fff',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer',
        }}
      >
        Go Home
      </button>
    </div>
  );
};
