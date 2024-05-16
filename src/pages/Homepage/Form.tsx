import { ReactElement } from 'react';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import { Button, Input } from '@/components/form';
import { ApolloQueryResult, OperationVariables } from '@apollo/client';

export type Inputs = {
  firstName: string;
  lastName: string;
};
interface Location {
  id: string;
  name: string;
  description: string;
  photo: string;
}

type Data = {
  locations?: Location[];
  stale?: boolean;
};
type FormProps = {
  refetch?: (
    variables?: Partial<OperationVariables> | undefined,
  ) => Promise<ApolloQueryResult<Data>>;
};
export default function Form({ refetch }: FormProps): ReactElement {
  const {
    handleSubmit,
    // watch,
    formState: { errors },
    control,
  } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = (data) => {
    console.log(data, '213213213');

    refetch?.();
  };

  // console.log(watch('lastName')); // watch input value by passing the name of it

  return (
    /* "handleSubmit" will validate your inputs before invoking "onSubmit" */
    <form onSubmit={handleSubmit(onSubmit)}>
      {/* register your input into the hook by invoking the "register" function */}
      <Controller name="firstName" control={control} render={({ field }) => <Input {...field} />} />

      {/* include validation with required or other standard HTML validation rules */}
      {/* <Input {...register('exampleRequired', { required: true })} /> */}
      <Controller
        name="lastName"
        rules={{ required: true }}
        control={control}
        render={({ field }) => <Input {...field} />}
      />
      {/* errors will return when field validation fails  */}
      {errors.lastName && <span>This field is required</span>}

      <Button type="submit" label="Submit" />
    </form>
  );
}
