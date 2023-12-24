import { schema } from '../../constants/schema';
import classes from './SignUpForm.module.css';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../../hooks';
import { registerWithEmailAndPassword } from '../../firebase';
import { signUpFields } from './types';

export function SignUpForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({ resolver: yupResolver(schema), mode: 'onChange' });

  const navigate = useNavigate();
  const { dictionary } = useLanguage();

  const signUp = (values: signUpFields) => {
    registerWithEmailAndPassword(values.email, values.password).then(() => {
      navigate('/');
    });
  };

  function onSubmit(values: signUpFields) {
    if (isValid) {
      signUp(values);
    }
  }

  return (
    <div className={classes.formContainer}>
      <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="email">
          Email:
          <input
            type="text"
            className={classes.formInput}
            id="email"
            {...register('email')}
          />
          {errors.email ? (
            <span className={classes.errorMessage}>{errors.email.message}</span>
          ) : (
            <span className={classes.errorMessage}></span>
          )}
        </label>
        <label htmlFor="password">
          <div className={classes.spaceBetween}>
            <div>Password</div>
          </div>
          <input
            type="password"
            className={classes.formInput}
            id="password"
            {...register('password')}
          />
          {errors.password ? (
            <div className={classes.errorMessage}>
              {errors.password.message}
            </div>
          ) : (
            <span className={classes.errorMessage}></span>
          )}
        </label>
        <label htmlFor="confirmPassword">
          Confirm password:
          <input
            type="password"
            className={classes.formInput}
            id="confirmPassword"
            {...register('confirmPassword')}
          />
          {errors.confirmPassword ? (
            <span className={classes.errorMessage}>
              {errors.confirmPassword.message}
            </span>
          ) : (
            <span className={classes.errorMessage}></span>
          )}
        </label>
        <button className={classes.formBtn} type="submit" disabled={!isValid}>
          {dictionary.signUp}
        </button>
      </form>
    </div>
  );
}
