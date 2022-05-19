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

const CrewForm = () => {
  const [createCrewMember, {}] = crewAPI.useCreateCrewMemberMutation();
  const [open, setOpen] = useState(false);
  const methods = useForm({ resolver: yupResolver(CrewFormSchema) });

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
    await createCrewMember(formData);
    // if (!error) {
    //   console.log({ toUpdate });
    //   if (toUpdate) {
    //     dispatch(vacancyModifiy(formData, true));
    //   } else {
    //     dispatch(vacancyModifiy(formData));
    //     reset();
    //   }

    //   setIsSuccess(true);
    // }
    reset();
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
        Add crew member
      </Button>

      <Dialog open={open} onClose={handleClose}>
        <FormProvider {...methods}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <FormControl>
              <DialogTitle>Add a new member</DialogTitle>
              <DialogContent>
                <DialogContentText>
                  To subscribe to this website, please enter your email address
                  here. We will send updates occasionally.
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
                  error={errors.name}
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
                  error={errors.job}
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
                  error={errors.department}
                  helperText={errors.department && errors.department.message}
                />
                <TextField
                  autoFocus
                  margin="dense"
                  label="Popularity"
                  type="number"
                  fullWidth
                  variant="standard"
                  {...register("popularity")}
                  error={errors.popularity}
                  helperText={errors.popularity && errors.popularity.message}
                />
                <GenderSelect />
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
