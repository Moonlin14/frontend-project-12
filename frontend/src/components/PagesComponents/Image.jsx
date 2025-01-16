const Image = ({ image, alt }) => (
  <div className="col-12 col-md-6 d-flex align-items-center justify-content-center">
    <img src={image} className="rounded-circle" alt={alt} width={300} />
  </div>
);

export default Image;
