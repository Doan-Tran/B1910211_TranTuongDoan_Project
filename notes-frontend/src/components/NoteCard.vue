<script>
    export default {
        props: {
            note: { type: Object, required: true },
        },
    };
</script>

<template>
    <div>
        <div class="p-1">
            <strong>Tên:</strong>
            {{ note.name }}
        </div>
        <div class="p-1">
            <strong>Tiêu đề:</strong>
            {{ note.title }}
        </div>
        <div class="p-1">
            <strong>Nội dung:</strong>
            {{ note.description }}
        </div>
        <div class="p-1">
            <strong>Ghi chú quan trọng:&nbsp;</strong>
            <i v-if="note.important" class="fas fa-check"></i>
            <i v-else class="fas fa-times"></i>
        </div>
    </div>
</template>