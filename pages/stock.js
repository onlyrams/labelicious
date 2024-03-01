import { Text } from "@mantine/core";
import { Dropzone } from "@mantine/dropzone";

export default function Stock() {
    return (
        <div>
            <Dropzone
                onDrop={(drop) => {
                    console.log(drop);
                }}
                accept={["text/csv"]}
                multiple={false}
            >
                <Text ta="center">Drop stock file</Text>
            </Dropzone>
        </div>
    );
}
