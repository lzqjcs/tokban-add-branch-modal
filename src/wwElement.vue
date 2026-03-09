<template>
  <div class="tokban-branch-root" :style="rootCssVars">
    <div
      v-if="showModal"
      class="tokban-branch-backdrop"
      :class="{ active: backdropActive }"
      @click.self="handleBackdropClick"
    >
      <div
        class="tokban-branch-panel"
        :class="{ closing: isClosing }"
        :style="panelStyle"
      >

        <!-- ═══ Header ═══ -->
        <div class="tokban-branch-header">
          <div class="tokban-branch-header-text">
            <h2 class="tokban-branch-title">{{ content?.title || 'New Branch' }}</h2>
            <p class="tokban-branch-subtitle" v-if="content?.subtitlePrefix || content?.entityName">
              {{ content?.subtitlePrefix || 'Adding branch to' }}
              <strong>{{ content?.entityName || '' }}</strong>
            </p>
          </div>
          <button
            v-if="content?.showCloseButton !== false"
            class="tokban-branch-close-btn"
            :disabled="isLoading"
            @click="handleClose"
            aria-label="Close"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"/>
              <line x1="6" y1="6" x2="18" y2="18"/>
            </svg>
          </button>
        </div>

        <div class="tokban-branch-divider"></div>

        <!-- ═══ Body ═══ -->
        <div class="tokban-branch-body">

          <!-- Branch Name -->
          <div class="tokban-branch-field">
            <label class="tokban-branch-label">
              {{ content?.branchNameLabel || 'Branch Name' }}
              <span class="tokban-branch-required">*</span>
            </label>
            <input
              ref="branchNameRef"
              type="text"
              class="tokban-branch-input"
              :class="{ 'is-error': branchNameError }"
              :placeholder="content?.branchNamePlaceholder || 'e.g. Surabaya, Bandung Utara'"
              :value="branchName"
              :disabled="isLoading"
              @input="handleBranchNameInput"
              @blur="validateBranchName"
            />
            <p v-if="content?.branchNameHint && !branchNameError" class="tokban-branch-hint">
              {{ resolvedBranchNameHint }}
            </p>
            <p v-if="branchNameError" class="tokban-branch-error-text">{{ branchNameError }}</p>
          </div>

          <!-- Contact Person -->
          <div class="tokban-branch-field">
            <label class="tokban-branch-label">
              {{ content?.contactLabel || 'Contact Person (PIC)' }}
              <span class="tokban-branch-required">*</span>
            </label>
            <input
              type="text"
              class="tokban-branch-input"
              :class="{ 'is-error': contactError }"
              :placeholder="content?.contactPlaceholder || 'Branch contact person name'"
              :value="contactPerson"
              :disabled="isLoading"
              @input="handleContactInput"
              @blur="validateContact"
            />
            <p v-if="contactError" class="tokban-branch-error-text">{{ contactError }}</p>
          </div>

          <!-- Phone -->
          <div class="tokban-branch-field">
            <label class="tokban-branch-label">
              {{ content?.phoneLabel || 'Phone' }}
              <span class="tokban-branch-required">*</span>
            </label>
            <div class="tokban-branch-phone-row" :class="{ 'is-error': phoneError }">
              <div class="tokban-branch-phone-prefix">
                {{ content?.phonePrefix || '+62' }}
              </div>
              <input
                type="tel"
                class="tokban-branch-phone-input"
                :placeholder="content?.phonePlaceholder || '8xxxxxxxxxx'"
                :value="phone"
                :disabled="isLoading"
                @input="handlePhoneInput"
                @blur="validatePhone"
              />
            </div>
            <p v-if="phoneError" class="tokban-branch-error-text">{{ phoneError }}</p>
          </div>

          <!-- Info Banner -->
          <div
            v-if="content?.infoBannerTitle || content?.infoBannerText"
            class="tokban-branch-banner"
          >
            <svg class="tokban-branch-banner-icon" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path fill-rule="evenodd" d="M9.401 3.003c1.155-2 4.043-2 5.197 0l7.355 12.748c1.154 2-.29 4.5-2.599 4.5H4.645c-2.309 0-3.752-2.5-2.598-4.5L9.4 3.003zM12 8.25a.75.75 0 01.75.75v3.75a.75.75 0 01-1.5 0V9a.75.75 0 01.75-.75zm0 8.25a.75.75 0 100-1.5.75.75 0 000 1.5z" clip-rule="evenodd"/>
            </svg>
            <div class="tokban-branch-banner-content">
              <p v-if="content?.infoBannerTitle" class="tokban-branch-banner-title">
                {{ content.infoBannerTitle }}
              </p>
              <p v-if="content?.infoBannerText" class="tokban-branch-banner-body">
                {{ content.infoBannerText }}
              </p>
            </div>
          </div>

          <!-- Extra body dropzone -->
          <wwLayout
            path="extraBodyContent"
            direction="column"
            class="tokban-branch-body-dropzone"
          />
        </div>

        <!-- ═══ Footer ═══ -->
        <div class="tokban-branch-footer">
          <button
            v-if="content?.showCancelButton !== false"
            class="tokban-branch-cancel-btn"
            :disabled="isLoading"
            @click="handleCancel"
          >
            {{ content?.cancelText || 'Cancel' }}
          </button>
          <button
            class="tokban-branch-confirm-btn"
            :disabled="!formValid || isLoading"
            :style="confirmBtnStyle"
            @click="handleConfirm"
          >
            <span v-if="isLoading" class="tokban-branch-spinner"></span>
            <span>{{ isLoading ? (content?.loadingText || 'Creating...') : (content?.confirmText || 'Create Branch') }}</span>
          </button>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
import { computed, ref, watch, nextTick, onMounted, onBeforeUnmount } from 'vue';

const BTN_COLOR_MAP = {
  orange: '#f97316',
  blue:   '#2563eb',
  green:  '#16a34a',
  red:    '#ef4444',
  amber:  '#d97706',
};

export default {
  props: {
    uid:     { type: String, required: true },
    content: { type: Object, required: true },
    /* wwEditor:start */
    wwEditorState: { type: Object, required: true },
    /* wwEditor:end */
  },
  emits: ['trigger-event'],
  setup(props, { emit }) {

    const { value: isOpen, setValue: setIsOpen } =
      wwLib.wwVariable.useComponentVariable({ uid: props.uid, name: 'isOpen', type: 'boolean', defaultValue: false });

    const { value: isLoading, setValue: setIsLoading } =
      wwLib.wwVariable.useComponentVariable({ uid: props.uid, name: 'isLoading', type: 'boolean', defaultValue: false });

    const { value: branchName, setValue: setBranchName } =
      wwLib.wwVariable.useComponentVariable({ uid: props.uid, name: 'branchName', type: 'string', defaultValue: '' });

    const { value: contactPerson, setValue: setContactPerson } =
      wwLib.wwVariable.useComponentVariable({ uid: props.uid, name: 'contactPerson', type: 'string', defaultValue: '' });

    const { value: phone, setValue: setPhone } =
      wwLib.wwVariable.useComponentVariable({ uid: props.uid, name: 'phone', type: 'string', defaultValue: '' });

    const { value: formValid, setValue: setFormValid } =
      wwLib.wwVariable.useComponentVariable({ uid: props.uid, name: 'formValid', type: 'boolean', defaultValue: false });

    const showModal      = ref(false);
    const backdropActive = ref(false);
    const isClosing      = ref(false);
    const branchNameRef  = ref(null);

    const branchNameError = ref('');
    const contactError    = ref('');
    const phoneError      = ref('');

    const rootCssVars = computed(() => ({
      '--backdrop-color':      props.content?.backdropColor         || 'rgba(0,0,0,0.4)',
      '--backdrop-blur':       props.content?.backdropBlur          || '2px',
      '--panel-radius':        props.content?.borderRadius          || '12px',
      '--panel-bg':            props.content?.panelBackground       || '#ffffff',
      '--divider-color':       props.content?.dividerColor          || '#e5e7eb',
      '--footer-bg':           props.content?.footerBackground      || 'transparent',
      '--btn-radius':          props.content?.buttonRadius          || '8px',
      '--cancel-color':        props.content?.cancelBtnColor        || '#4b5563',
      '--input-radius':        props.content?.inputRadius           || '8px',
      '--input-border':        props.content?.inputBorderColor      || '#d1d5db',
      '--input-focus':         props.content?.inputFocusColor       || '#f97316',
      '--required-color':      props.content?.requiredColor         || '#ef4444',
      '--label-color':         props.content?.labelColor            || '#111827',
      '--hint-color':          props.content?.hintColor             || '#9ca3af',
      '--banner-bg':           props.content?.bannerBackground      || '#fffbeb',
      '--banner-border':       props.content?.bannerBorderColor     || '#fde68a',
      '--banner-title-color':  props.content?.bannerTitleColor      || '#92400e',
      '--banner-text-color':   props.content?.bannerTextColor       || '#b45309',
      '--banner-icon-color':   props.content?.bannerIconColor       || '#f59e0b',
      '--prefix-bg':           props.content?.phonePrefixBackground || '#f9fafb',
      '--prefix-color':        props.content?.phonePrefixColor      || '#374151',
    }));

    const panelStyle = computed(() => ({
      maxWidth: props.content?.modalMaxWidth || '480px',
    }));

    const confirmBtnStyle = computed(() => {
      const colorKey = props.content?.confirmColor || 'orange';
      return { backgroundColor: BTN_COLOR_MAP[colorKey] ?? colorKey };
    });

    const resolvedBranchNameHint = computed(() => {
      const hint   = props.content?.branchNameHint || '';
      const entity = props.content?.entityName     || '';
      const branch = (branchName.value || '').trim() || '[Branch Name]';
      return hint.replace('{entityName}', entity).replace('{branchName}', branch);
    });

    const validateBranchName = () => {
      if (!(branchName.value || '').trim()) {
        branchNameError.value = props.content?.branchNameRequired || 'Branch name is required';
        return false;
      }
      branchNameError.value = '';
      return true;
    };

    const validateContact = () => {
      if (!(contactPerson.value || '').trim()) {
        contactError.value = props.content?.contactRequired || 'Contact person is required';
        return false;
      }
      contactError.value = '';
      return true;
    };

    const validatePhone = () => {
      if (!(phone.value || '').trim()) {
        phoneError.value = props.content?.phoneRequired || 'Phone number is required';
        return false;
      }
      phoneError.value = '';
      return true;
    };

    const recomputeFormValid = () => {
      setFormValid(
        (branchName.value    || '').trim().length > 0 &&
        (contactPerson.value || '').trim().length > 0 &&
        (phone.value         || '').trim().length > 0
      );
    };

    const handleBranchNameInput = (e) => {
      const val = e?.target?.value ?? '';
      setBranchName(val);
      if (branchNameError.value) validateBranchName();
      recomputeFormValid();
      emit('trigger-event', { name: 'branch-name-change', event: { value: val } });
    };

    const handleContactInput = (e) => {
      const val = e?.target?.value ?? '';
      setContactPerson(val);
      if (contactError.value) validateContact();
      recomputeFormValid();
      emit('trigger-event', { name: 'contact-change', event: { value: val } });
    };

    const handlePhoneInput = (e) => {
      const val = e?.target?.value ?? '';
      setPhone(val);
      if (phoneError.value) validatePhone();
      recomputeFormValid();
      emit('trigger-event', { name: 'phone-change', event: { value: val } });
    };

    const resetForm = () => {
      setBranchName('');
      setContactPerson('');
      setPhone('');
      setFormValid(false);
      branchNameError.value = '';
      contactError.value    = '';
      phoneError.value      = '';
    };

    const openModal = () => {
      showModal.value = true;
      isClosing.value = false;
      setIsLoading(false);
      resetForm();
      setIsOpen(true);
      nextTick(() => {
        backdropActive.value = true;
        if (branchNameRef.value) branchNameRef.value.focus();
      });
    };

    const closeModal = (reason) => {
      if (isClosing.value) return;
      isClosing.value      = true;
      backdropActive.value = false;
      setTimeout(() => {
        showModal.value = false;
        isClosing.value = false;
        setIsOpen(false);
        setIsLoading(false);
        if (reason !== 'external') {
          emit('trigger-event', { name: 'close', event: { reason } });
        }
      }, 150);
    };

    watch(
      () => props.content?.visible,
      (newVal) => {
        if (newVal && !showModal.value)                          openModal();
        else if (!newVal && showModal.value && !isClosing.value) closeModal('external');
      },
      { immediate: true }
    );

    watch(() => props.content?.loading, (newVal) => setIsLoading(!!newVal));

    const handleBackdropClick = () => {
      if (isLoading.value) return;
      if (props.content?.closeOnBackdropClick !== false) closeModal('backdrop');
    };

    const handleClose = () => {
      if (isLoading.value) return;
      emit('trigger-event', { name: 'cancel', event: {} });
      closeModal('close-button');
    };

    const handleCancel = () => {
      if (isLoading.value) return;
      emit('trigger-event', { name: 'cancel', event: {} });
      closeModal('cancel');
    };

    const handleConfirm = () => {
      const b = validateBranchName();
      const c = validateContact();
      const p = validatePhone();
      if (!b || !c || !p) return;
      if (isLoading.value) return;
      emit('trigger-event', {
        name: 'confirm',
        event: {
          branchName:    branchName.value,
          contactPerson: contactPerson.value,
          phone:         (props.content?.phonePrefix || '+62') + phone.value,
          phoneRaw:      phone.value,
        },
      });
      if (props.content?.autoLoading !== false) {
        setIsLoading(true);
      } else {
        closeModal('confirm');
      }
    };

    const handleKeydown = (e) => {
      if (!showModal.value || isLoading.value) return;
      if (e?.key === 'Escape' && props.content?.closeOnEscape !== false) {
        closeModal('escape');
      }
    };

    onMounted(() => {
      const frontDoc = wwLib.getFrontDocument();
      if (frontDoc) frontDoc.addEventListener('keydown', handleKeydown);
    });

    onBeforeUnmount(() => {
      const frontDoc = wwLib.getFrontDocument();
      if (frontDoc) frontDoc.removeEventListener('keydown', handleKeydown);
    });

    /* wwEditor:start */
    const isEditing = computed(() => props.wwEditorState?.isEditing);
    /* wwEditor:end */

    return {
      showModal,
      backdropActive,
      isClosing,
      branchNameRef,
      rootCssVars,
      panelStyle,
      confirmBtnStyle,
      resolvedBranchNameHint,
      branchName,
      contactPerson,
      phone,
      isLoading,
      formValid,
      branchNameError,
      contactError,
      phoneError,
      validateBranchName,
      validateContact,
      validatePhone,
      handleBranchNameInput,
      handleContactInput,
      handlePhoneInput,
      handleBackdropClick,
      handleClose,
      handleCancel,
      handleConfirm,
      /* wwEditor:start */
      isEditing,
      /* wwEditor:end */
    };
  },
};
</script>

<style scoped>
.tokban-branch-root { position: relative; }

/* ── Backdrop ── */
.tokban-branch-backdrop {
  position: fixed;
  top: 0; left: 0; right: 0; bottom: 0;
  background: var(--backdrop-color);
  backdrop-filter: blur(var(--backdrop-blur));
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 16px;
  z-index: 9999;
  opacity: 0;
  transition: opacity 0.2s ease;
  pointer-events: none;
  overflow-y: auto;
}
.tokban-branch-backdrop.active {
  opacity: 1;
  pointer-events: auto;
}

/* ── Animations ── */
@keyframes tokban-branch-in {
  from { opacity: 0; transform: translateY(8px) scale(0.98); }
  to   { opacity: 1; transform: translateY(0) scale(1); }
}
@keyframes tokban-branch-out {
  from { opacity: 1; transform: translateY(0) scale(1); }
  to   { opacity: 0; transform: translateY(8px) scale(0.98); }
}

/* ── Panel ── */
.tokban-branch-panel {
  background: var(--panel-bg);
  border-radius: var(--panel-radius);
  box-shadow: 0 25px 50px -12px rgba(0,0,0,0.2);
  width: 100%;
  animation: tokban-branch-in 0.2s ease-out forwards;
  display: flex;
  flex-direction: column;
  max-height: calc(100dvh - 32px);
}
.tokban-branch-panel.closing { animation: tokban-branch-out 0.15s ease-in forwards; }

/* ── Header ── */
.tokban-branch-header {
  display: flex; align-items: flex-start; justify-content: space-between;
  padding: 24px 24px 16px; gap: 12px;
  flex-shrink: 0;
}
.tokban-branch-header-text { flex: 1; min-width: 0; }
.tokban-branch-title {
  margin: 0 0 4px; font-size: 18px; font-weight: 700;
  color: var(--label-color); line-height: 1.3;
}
.tokban-branch-subtitle {
  margin: 0; font-size: 14px; color: #6b7280; line-height: 1.4;
}
.tokban-branch-subtitle strong { font-weight: 600; color: #374151; }

.tokban-branch-close-btn {
  width: 32px; height: 32px;
  display: flex; align-items: center; justify-content: center;
  background: none; border: none; color: #9ca3af; cursor: pointer;
  border-radius: 6px; transition: color 0.15s, background 0.15s; flex-shrink: 0;
}
.tokban-branch-close-btn:hover:not(:disabled) { color: #374151; background: #f3f4f6; }
.tokban-branch-close-btn:disabled { opacity: 0.4; cursor: not-allowed; }

.tokban-branch-divider { height: 1px; background: var(--divider-color); flex-shrink: 0; }

/* ── Body ── */
.tokban-branch-body {
  padding: 20px 24px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  overflow-y: auto;
  flex: 1;
  min-height: 0;
}

/* ── Fields ── */
.tokban-branch-field { display: flex; flex-direction: column; gap: 6px; }
.tokban-branch-label { font-size: 14px; font-weight: 500; color: var(--label-color); line-height: 1.4; }
.tokban-branch-required { color: var(--required-color); margin-left: 2px; }

.tokban-branch-input {
  width: 100%; padding: 10px 14px;
  border: 1px solid var(--input-border); border-radius: var(--input-radius);
  font-size: 14px; color: #111827; outline: none;
  transition: border-color 0.15s, box-shadow 0.15s;
  font-family: inherit; box-sizing: border-box; background: #fff;
}
.tokban-branch-input::placeholder { color: #9ca3af; }
.tokban-branch-input:focus {
  border-color: var(--input-focus);
  box-shadow: 0 0 0 3px color-mix(in srgb, var(--input-focus) 15%, transparent);
}
.tokban-branch-input.is-error { border-color: #ef4444; }
.tokban-branch-input.is-error:focus { border-color: #ef4444; box-shadow: 0 0 0 3px rgba(239,68,68,0.12); }
.tokban-branch-input:disabled { background: #f9fafb; cursor: not-allowed; color: #9ca3af; }

/* ── Phone ── */
.tokban-branch-phone-row {
  display: flex; border: 1px solid var(--input-border);
  border-radius: var(--input-radius); overflow: hidden;
  transition: border-color 0.15s, box-shadow 0.15s;
}
.tokban-branch-phone-row:focus-within {
  border-color: var(--input-focus);
  box-shadow: 0 0 0 3px color-mix(in srgb, var(--input-focus) 15%, transparent);
}
.tokban-branch-phone-row.is-error { border-color: #ef4444; }
.tokban-branch-phone-row.is-error:focus-within { border-color: #ef4444; box-shadow: 0 0 0 3px rgba(239,68,68,0.12); }
.tokban-branch-phone-prefix {
  padding: 10px 14px; background: var(--prefix-bg); color: var(--prefix-color);
  font-size: 14px; font-weight: 500;
  border-right: 1px solid var(--input-border);
  white-space: nowrap; display: flex; align-items: center;
}
.tokban-branch-phone-input {
  flex: 1; padding: 10px 14px; border: none; outline: none;
  font-size: 14px; color: #111827; font-family: inherit;
  background: #fff; min-width: 0;
}
.tokban-branch-phone-input::placeholder { color: #9ca3af; }
.tokban-branch-phone-input:disabled { background: #f9fafb; cursor: not-allowed; }

/* ── Hint & Error ── */
.tokban-branch-hint { margin: 0; font-size: 13px; color: var(--hint-color); line-height: 1.4; }
.tokban-branch-error-text { margin: 0; font-size: 12px; color: #ef4444; line-height: 1.4; }

/* ── Banner ── */
.tokban-branch-banner {
  display: flex; align-items: flex-start; gap: 10px;
  padding: 12px 14px;
  background: var(--banner-bg); border: 1px solid var(--banner-border); border-radius: 8px;
}
.tokban-branch-banner-icon { flex-shrink: 0; color: var(--banner-icon-color); margin-top: 1px; }
.tokban-branch-banner-content { display: flex; flex-direction: column; gap: 2px; }
.tokban-branch-banner-title { margin: 0; font-size: 14px; font-weight: 600; color: var(--banner-title-color); }
.tokban-branch-banner-body  { margin: 0; font-size: 13px; color: var(--banner-text-color); line-height: 1.5; }

/* ── Extra dropzone ── */
.tokban-branch-body-dropzone { min-height: 0; }
/* wwEditor:start */
.tokban-branch-body-dropzone:empty {
  min-height: 40px; border: 2px dashed #d0d0d0; border-radius: 6px;
  display: flex; align-items: center; justify-content: center;
}
.tokban-branch-body-dropzone:empty::after {
  content: 'Drop extra content here'; color: #999; font-size: 12px; font-style: italic; pointer-events: none;
}
/* wwEditor:end */

/* ── Footer ── */
.tokban-branch-footer {
  display: flex; align-items: center; justify-content: flex-end;
  gap: 12px; padding: 16px 24px; background: var(--footer-bg);
  flex-shrink: 0;
  border-top: 1px solid var(--divider-color);
}

.tokban-branch-cancel-btn {
  padding: 10px 20px; font-size: 14px; font-weight: 500;
  color: var(--cancel-color); background: none; border: none;
  cursor: pointer; border-radius: var(--btn-radius);
  transition: color 0.15s, background 0.15s; font-family: inherit;
}
.tokban-branch-cancel-btn:hover:not(:disabled) { color: #111827; background: #f3f4f6; }
.tokban-branch-cancel-btn:disabled { opacity: 0.4; cursor: not-allowed; }

.tokban-branch-confirm-btn {
  display: flex; align-items: center; gap: 8px;
  padding: 10px 24px; font-size: 14px; font-weight: 600;
  color: #ffffff; border: none; border-radius: var(--btn-radius);
  cursor: pointer; transition: filter 0.15s, opacity 0.15s;
  box-shadow: 0 1px 3px rgba(0,0,0,0.1); font-family: inherit;
}
.tokban-branch-confirm-btn:hover:not(:disabled) { filter: brightness(0.92); }
.tokban-branch-confirm-btn:disabled { opacity: 0.4; cursor: not-allowed; }

/* ── Spinner ── */
@keyframes tokban-branch-spin { to { transform: rotate(360deg); } }
.tokban-branch-spinner {
  width: 14px; height: 14px;
  border: 2px solid rgba(255,255,255,0.4); border-top-color: #fff;
  border-radius: 50%; animation: tokban-branch-spin 0.6s linear infinite; flex-shrink: 0;
}
</style>
