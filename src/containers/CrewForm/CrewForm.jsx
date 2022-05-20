import { yupResolver } from "@hookform/resolvers/yup";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControl,
  TextField,
} from "@mui/material";
import React, { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { GenderSelect } from "../../components";
import { crewAPI } from "../../services/CrewServer";
import { CrewFormSchema } from "./CrewFormSchema";

const CrewForm = ({ buttonText, defaultValues }) => {
  const [createCrewMember, {}] = crewAPI.useCreateCrewMemberMutation();
  const [updateCrewMember, {}] = crewAPI.useUpdateCrewMemberMutation();
  const [open, setOpen] = useState(false);
  const methods = useForm({
    defaultValues,
    resolver: yupResolver(CrewFormSchema),
  });

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
    reset,
    clearErrors,
  } = methods;

  const onSubmit = async (formData) => {
    console.log(formData, "formData");
    console.log("update");

    // if (!error) {
    //   console.log({ toUpdate });
    if (defaultValues) {
      await updateCrewMember(formData);
    } else {
      await createCrewMember(formData);
      reset();
    }

    //   setIsSuccess(true);
    // }
    // reset();
    setOpen(false);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    clearErrors();
  };

  return (
    <div>
      <Button variant="outlined" onClick={handleClickOpen}>
        {buttonText}
      </Button>

      <Dialog open={open} onClose={handleClose}>
        <FormProvider {...methods}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <FormControl>
              <DialogTitle>
                {defaultValues ? "Edit the member" : "Add a new member"}
              </DialogTitle>
              <DialogContent>
                <DialogContentText>
                  Every member of the crew is very important. We respect and
                  love all them. To work in crew is a great pleasure.
                </DialogContentText>
                <TextField
                  autoFocus
                  margin="dense"
                  id="name"
                  label="Name"
                  type="name"
                  fullWidth
                  variant="standard"
                  {...register("name")}
                  error={!!errors.name}
                  helperText={errors.name && errors.name.message}
                />
                <TextField
                  autoFocus
                  margin="dense"
                  id="job"
                  label="Job"
                  type="text"
                  fullWidth
                  variant="standard"
                  {...register("job")}
                  error={!!errors.job}
                  helperText={errors.job && errors.job.message}
                />

                <TextField
                  autoFocus
                  margin="dense"
                  label="Department"
                  type="text"
                  fullWidth
                  variant="standard"
                  {...register("department")}
                  error={!!errors.department}
                  helperText={errors.department && errors.department.message}
                />
                <TextField
                  sx={{ mb: 1.5 }}
                  autoFocus
                  margin="dense"
                  label="Popularity"
                  type="number"
                  fullWidth
                  variant="standard"
                  {...register("popularity")}
                  error={!!errors.popularity}
                  helperText={errors.popularity && errors.popularity.message}
                />
                <GenderSelect defaultGender={defaultValues?.gender} />
                {/* <Controller
                control={control}

                render={({field: { onChange, value, name, ref }})}
                // {...register("gender")}
                // as={<GenderSelect />}
              /> */}
              </DialogContent>
              <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                <Button type="submit">Subscribe</Button>
              </DialogActions>
            </FormControl>
          </form>
        </FormProvider>
      </Dialog>
    </div>
  );
};

export { CrewForm };
