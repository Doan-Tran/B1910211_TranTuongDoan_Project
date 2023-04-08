<template>
    <Form @submit="submitNote" :validation-schema="noteFormSchema">
        <div class="form-group">
            <label for="name">Tên</label>
            <Field
                name="name"
                type="text"
                class="form-control"
                v-model="noteLocal.name"
            />
            <ErrorMessage name="name" class="error-feedback" />
        </div>
        <div class="form-group">
            <label for="title">Tiêu đề</label>
            <Field
                name="title"
                type="text"
                class="form-control"
                v-model="noteLocal.title"
            />
            <ErrorMessage name="title" class="error-feedback" />
        </div>
        <div class="form-group">
            <label for="description">Nội dung</label>
            <Field
                name="description"
                type="text"
                class="form-control"
                v-model="noteLocal.description"
            />
            <ErrorMessage name="description" class="error-feedback" />
        </div>

        <div class="form-group form-check">
            <input
                name="favorite"
                type="checkbox"
                class="form-check-input"
                v-model="noteLocal.favorite"
            />
            <label for="favorite" class="form-check-label">
                <strong>Ghi chú yêu thích</strong>
            </label>
        </div>

        <div class="form-group">
            <button class="btn btn-primary">Lưu</button>
            <button
                v-if="noteLocal._id"
                type="button"
                class="ml-2 btn btn-danger"
                @click="deleteNote"
            >
                Xóa
            </button>
        </div>
    </Form>
</template>

<script>
import * as yup from "yup";
import { Form, Field, ErrorMessage } from "vee-validate";

export default {
    components: {
        Form,
        Field,
        ErrorMessage,
    },
    emits: ["submit:note", "delete:note"],
    props: {
        note: { type: Object, required: true }
    },
    data() {
        const noteFormSchema = yup.object().shape({
            name: yup
                .string()
                .required("Tên phải có giá trị.")
                .min(2, "Tên phải ít nhất 2 ký tự.")
                .max(50, "Tên có nhiều nhất 50 ký tự."),
            title: yup
                .string()
                .required("Tiêu đề phải có giá trị.")
                .min(2, "Tiêu đề phải ít nhất 2 ký tự."),
            description: yup.string().max(500, "Nội dung tối đa 500 ký tự."),
        });
        return {
            // Chúng ta sẽ không muốn hiệu chỉnh props, nên tạo biến cục bộ
            // noteLocal để liên kết với các input trên form
            noteLocal: this.note,
            noteFormSchema,
        };
    },
    methods: {
        submitNote() {
            this.$emit("submit:note", this.noteLocal);
        },
        deleteNote() {
            this.$emit("delete:note", this.noteLocal.id);
        },
    },
};
</script>

<style scoped>
@import "@/assets/form.css";
</style>