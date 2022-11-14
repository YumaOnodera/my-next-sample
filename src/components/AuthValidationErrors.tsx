const AuthValidationErrors: React.FC<{ errors: string[] }> = ({
  errors = [],
  ...props
}) => (
  <>
    {errors.length > 0 && (
      <div {...props}>
        <div>Whoops! Something went wrong.</div>

        <ul>
          {errors.map((error) => (
            <li key={error}>{error}</li>
          ))}
        </ul>
      </div>
    )}
  </>
);

export default AuthValidationErrors;
