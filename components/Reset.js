import useForm from "@/lib/useForm";
import Form from "./styles/Form";
import gql from "graphql-tag";
import { useMutation } from "@apollo/client";
import { CURRENT_USER_QUERY } from "./User";
import Error from './ErrorMessage';

const RESET_MUTATION = gql`
mutation RESET_MUTATION($email: String!, $token: String!, $password: String!) {
  redeemUserPasswordResetToken(email: $email, token: $token, password: $password) {
    code
    message
  }
}
`;

export default function Reset({token}) {
    const {inputs, handleChange, resetForm} = useForm({
        email: '',
        password: '',
        token: token,
    });
    const [resetPassword, {data, loading, error}] = useMutation(RESET_MUTATION, {
        variables: inputs,
    });

    const successfulError = data?.redeemUserPasswordResetToken?.code ? data?.
    redeemUserPasswordResetToken : undefined;
    console.log(error);

    async function handleSubmit(e) {
        e.preventDefault(); // stop the form from submitting
        console.log(inputs);
        const res = await resetPassword().catch(console.error);
        console.log(res);
        console.log({data, loading, error})
        resetForm();
        // Send the email and password to the graphqlAPI
    }
    //const error = data?.authenticateUserWithPassword.__typename ===
    //"UserAuthenticationWithPasswordFailure"
    // ? data?.authenticateUserWithPassword
    // : undefined;
  return (
    <Form method="POST" onSubmit={handleSubmit}>
        <h2>Reset Your Password</h2>
        <Error error={error || successfulError} />
      <fieldset disabled={loading} aria-busy={loading}>
        {data?.redeemUserPasswordResetToken === null && (
            <p>
                Success! You can now sign in!
            </p>
        )}
        <label htmlFor="email">
            Email
            <input
             type="email" 
             name="email" 
             placeholder="Your Email Address" 
             autoComplete="email" 
             value={inputs.email}
             onChange={handleChange}
            />
        </label>
        <label htmlFor="password">
            Password
            <input
             type="password" 
             name="password" 
             placeholder="Your Password" 
             autoComplete="password" 
             value={inputs.password}
             onChange={handleChange}
            />
        </label>
        <button type="submit">Reset Password!</button>
      </fieldset>
    </Form>
  )
}
