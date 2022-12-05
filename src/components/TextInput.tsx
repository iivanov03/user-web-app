import { FormEvent, memo, useState } from "react";
import { styled } from '@mui/material/styles';
import { TextField } from "@mui/material";

const Container = styled('div')({
    display: "flex",
    flexDirection: "column"
})

const InnerContent = styled('div')({
    position: "relative",
    display: "flex",
    alignItems: "center"
})

const Validation = styled('div')({
    fontSize: "0.8em",
    color: "red",
    marginTop: "0.5em",
})

const TextInput = memo(
    ({ className, label, errorText, id, RhsComponent, ...rest }: any) => {
        const [validationMessage, setValidationMessage] = useState<string>("");

        const onInvalid = (e: FormEvent) => {
            const target = e.target as HTMLInputElement;
            setValidationMessage(target.validationMessage);
        };

        const onBlur = (e: FormEvent) => {
            const target = e.target as HTMLInputElement;

            if (!!validationMessage) {
                setValidationMessage(target.validationMessage);
            }
        };


        return (
            <Container>
                <InnerContent>
                    <TextField
                        label={label}
                        id={id}
                        onInvalid={onInvalid}
                        onBlur={onBlur}
                        {...rest}
                    />
                    {RhsComponent && (
                        <div>{RhsComponent}</div>
                    )}
                </InnerContent>

                {!!validationMessage && (
                    <Validation>
                        {errorText || validationMessage}
                    </Validation>
                )}
            </Container>
        );
    }
);

export default TextInput;