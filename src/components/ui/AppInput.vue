<template>
  <div class="ac-field">
    <label :for="id" class="ac-label">
      {{ label }}<span v-if="required" aria-hidden="true"> *</span>
    </label>

    <component
      :is="type === 'textarea' ? 'textarea' : 'input'"
      :id="id"
      class="ac-input"
      :type="type === 'textarea' ? undefined : type"
      :value="modelValue"
      :required="required"
      :autocomplete="autocomplete"
      :rows="type === 'textarea' ? rows : undefined"
      :placeholder="placeholder"
      :aria-invalid="error ? 'true' : 'false'"
      :aria-describedby="error ? `${id}-error` : undefined"
      @input="$emit('update:modelValue', $event.target.value)"
      @blur="$emit('blur')"
    />

    <span v-if="error" :id="`${id}-error`" class="ac-error" role="alert">
      {{ error }}
    </span>
  </div>
</template>

<script setup>
defineProps({
  id: { type: String, required: true },
  label: { type: String, required: true },
  modelValue: { type: String, default: '' },
  type: { type: String, default: 'text' },
  required: { type: Boolean, default: false },
  autocomplete: { type: String, default: undefined },
  placeholder: { type: String, default: '' },
  rows: { type: Number, default: 4 },
  error: { type: String, default: '' },
})

defineEmits(['update:modelValue', 'blur'])
</script>

<style scoped>
textarea.ac-input {
  resize: vertical;
  min-height: 120px;
}
</style>
