export default ({ message }) => {
  const { id, username, text } = message;
  return (
    <div className="text-break mb-2" key={id}>
      <b>{username}</b>
      :
      {' '}
      {text}
    </div>
  );
};