import React from 'react';
import { push } from 'connected-react-router';
import { useForm } from 'react-hook-form';
import { connect } from 'react-redux';
import { useAppDispatch } from '../../App';
import { InputComponent } from '../../components/InputComponent/InputComponent';
import { login } from '../../core/store/actions/auth.actions';
import './AuthPage.scss';
import { EMAIL_REGEX } from '../../core/constants';

interface FormInputs {
  email: string;
  password: string;
}

const AuthPage = () => {
  const requiredMessage = 'This field is required!';
  const dispatch = useAppDispatch();
  const {
    register,
    handleSubmit,
    formState,
    errors,
    setError,
  } = useForm<FormInputs>({
    mode: 'onChange',
    shouldFocusError: true,
  });

  const submitHandler = async (data: FormInputs) => {
    const result = await dispatch(login(data));
    if (result.meta.requestStatus !== 'rejected') {
      dispatch(push('/chats'));
      return;
    }

    setError('password', { message: result.payload as string });
  };

  return (
    <div className="auth">
      <h1>Sign in to Chat</h1>
      <form className="auth__form" onSubmit={handleSubmit(submitHandler)}>
        <InputComponent
          name="email"
          type="text"
          placeholder="Email"
          error={errors.email}
          ref={register({
            required: requiredMessage,
            pattern: {
              value: EMAIL_REGEX,
              message: 'Invalid email format',
            },
          })}
          className="mb"
        />

        <InputComponent
          name="password"
          type="password"
          placeholder="Password"
          error={errors.password}
          ref={register({
            required: requiredMessage,
            minLength: {
              value: 8,
              message: 'Password should be at least 8 characters long.',
            },
          })}
          className="mb"
        />

        <button
          disabled={!formState.isValid || formState.isSubmitting}
          type="submit"
        >
          Sign In
        </button>
      </form>
    </div>
  );
};

export default connect()(AuthPage);
