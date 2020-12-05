import React from 'react';
import { useForm } from 'react-hook-form';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import { InputComponent } from '../../components/InputComponent/InputComponent';
import { loginActionCreator } from '../../core/store/actions/auth.actions';
import './AuthPage.scss';

interface AuthPageProps {
  dispatch: Dispatch;
}

interface FormInputs {
  email: string;
  password: string;
}

const AuthPage = ({ dispatch }: AuthPageProps) => {
  const emailRegex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;
  const requiredMessage = 'This field is required!';
  const dispatchLogin = bindActionCreators(loginActionCreator, dispatch);
  const { register, handleSubmit, formState, errors } = useForm<FormInputs>({
    mode: 'onChange',
    shouldFocusError: true,
  });

  const onSubmit = (data: FormInputs) => {
    dispatchLogin({ email: data.email });
  };

  const emailControl = register({
    required: requiredMessage,
    pattern: {
      value: emailRegex,
      message: 'Invalid email format',
    },
  });

  const passwordControl = register({
    required: requiredMessage,
    minLength: {
      value: 8,
      message: 'Password should be at least 8 characters long.',
    },
  });

  return (
    <div className="auth">
      <h1>Sign in to Chat</h1>
      <form className="auth-form" onSubmit={handleSubmit(onSubmit)}>
        <InputComponent
          name="email"
          type="text"
          placeholder="Email"
          error={errors.email}
          ref={emailControl}
          className="mb"
        />
        <InputComponent
          name="password"
          type="password"
          placeholder="Password"
          error={errors.password}
          ref={passwordControl}
          className="mb"
        />
        <button
          type="submit"
          disabled={!formState.isValid || formState.isSubmitting}
        >
          Sign In
        </button>
      </form>
    </div>
  );
};

export default connect()(AuthPage);
