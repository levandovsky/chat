import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { CgLogOut } from 'react-icons/cg';
import { User } from '../../core/store/interfaces';
import './ProfileComponent.scss';
export interface ProfileComponentProps {
  profile: User;
  onSave: (_username: string, _password: string) => Promise<void>;
  onLogout: () => void;
}
export interface ProfileDetailsForm {
  username: string;
  password: string;
}
const ProfileComponent = ({
  profile: { username, email, password },
  onLogout,
  onSave,
}: ProfileComponentProps) => {
  const [editing, setEditing] = useState<boolean>(false);
  const {
    register,
    getValues,
    formState,
    watch,
    setValue,
  } = useForm<ProfileDetailsForm>({
    mode: 'onChange',
    defaultValues: {
      password,
      username,
    },
  });
  const [isValid, setIsValid] = useState<boolean>(false);
  const { isValid: formValid } = formState;

  const passwordValue = watch('password');
  const usernameValue = watch('username');

  const handleSave = async () => {
    const { username: _username, password: _password } = getValues();
    if (isValid) {
      setEditing(false);
      onSave(_username, _password);
    }
  };

  const handleCancel = () => {
    setEditing(false);
    setValue('username', username);
    setValue('password', password);
  };

  const handleLogout = () => onLogout();
  useEffect(() => {
    if (
      (passwordValue !== password || usernameValue !== username) &&
      formValid
    ) {
      setIsValid(true);
    } else {
      setIsValid(false);
    }
  }, [passwordValue, usernameValue, password, username, formValid]);

  return (
    <div className="profile">
      <div className="profile__heading">
        <CgLogOut className="profile__logout" onClick={handleLogout} />
        <h3>Your Profile Info</h3>
      </div>
      <div className="profile__field">
        <label htmlFor="username">Username</label>

        <input
          ref={register({
            required: 'This field is required',
          })}
          name="username"
          disabled={!editing}
        />
      </div>
      <div className="profile__field">
        <label htmlFor="password">Password</label>

        <input
          ref={register({
            required: 'This field is required',
            minLength: {
              value: 8,
              message: 'Password must be at least 8 characters',
            },
          })}
          name="password"
          type={editing ? 'text' : 'password'}
          disabled={!editing}
        />
      </div>
      {editing ? (
        <div className="profile__button-group">
          <button
            className="profile__button profile__button--save"
            onClick={handleSave}
            disabled={!isValid}
          >
            Save
          </button>
          <button
            className="profile__button profile__button--cancel"
            onClick={handleCancel}
          >
            Cancel
          </button>
        </div>
      ) : (
        <button
          className="profile__button profile__button--edit"
          onClick={() => setEditing(true)}
          type="button"
        >
          Edit
        </button>
      )}
    </div>
  );
};

export default ProfileComponent;
