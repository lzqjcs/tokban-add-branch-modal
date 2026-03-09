export default {
  editor: {
    label: { en: 'Tokban Add Branch Modal' },
    icon: 'add',
  },
  triggerEvents: [
    {
      name: 'confirm',
      label: { en: 'On confirm' },
      event: { branchName: '', contactPerson: '', phone: '', phoneRaw: '' },
    },
    {
      name: 'cancel',
      label: { en: 'On cancel' },
      event: {},
    },
    {
      name: 'close',
      label: { en: 'On close' },
      event: { reason: '' },
    },
    {
      name: 'branch-name-change',
      label: { en: 'On branch name change' },
      event: { value: '' },
    },
    {
      name: 'contact-change',
      label: { en: 'On contact person change' },
      event: { value: '' },
    },
    {
      name: 'phone-change',
      label: { en: 'On phone change' },
      event: { value: '' },
    },
  ],
  properties: {

    // ══════════════════════════════
    // DROPZONE
    // ══════════════════════════════

    extraBodyContent: {
      hidden: true,
      defaultValue: [],
    },

    // ══════════════════════════════
    // SETTINGS — Visibility
    // ══════════════════════════════

    visible: {
      label: { en: 'Visible' },
      type: 'OnOff',
      section: 'settings',
      defaultValue: false,
      bindable: true,
      /* wwEditor:start */
      bindingValidation: { type: 'boolean', tooltip: 'Bind to a variable and set true to open the modal.' },
      propertyHelp: { tooltip: 'Controls modal visibility. Toggle from a workflow to show/hide.' },
      /* wwEditor:end */
    },

    // ══════════════════════════════
    // SETTINGS — Header
    // ══════════════════════════════

    title: {
      label: { en: 'Modal Title' },
      type: 'Text',
      section: 'settings',
      defaultValue: 'New Branch',
      bindable: true,
      /* wwEditor:start */
      bindingValidation: { type: 'string', tooltip: 'Title text shown at the top of the modal.' },
      /* wwEditor:end */
    },
    subtitlePrefix: {
      label: { en: 'Subtitle Prefix' },
      type: 'Text',
      section: 'settings',
      defaultValue: 'Adding branch to',
      bindable: true,
      /* wwEditor:start */
      bindingValidation: { type: 'string', tooltip: 'Text before the entity name in the subtitle.' },
      /* wwEditor:end */
    },
    entityName: {
      label: { en: 'Entity Name' },
      type: 'Text',
      section: 'settings',
      defaultValue: '',
      bindable: true,
      /* wwEditor:start */
      bindingValidation: { type: 'string', tooltip: 'The parent entity name shown bold in the subtitle. Bind to selected entity.' },
      propertyHelp: { tooltip: 'e.g. "PT Sumber Material Jaya". Bind to your selected entity variable.' },
      /* wwEditor:end */
    },
    showCloseButton: {
      label: { en: 'Show Close (×) Button' },
      type: 'OnOff',
      section: 'settings',
      defaultValue: true,
      bindable: true,
      /* wwEditor:start */
      bindingValidation: { type: 'boolean', tooltip: 'Show or hide the × close button in the header.' },
      /* wwEditor:end */
    },

    // ══════════════════════════════
    // SETTINGS — Fields
    // ══════════════════════════════

    branchNameLabel: {
      label: { en: 'Branch Name Label' },
      type: 'Text',
      section: 'settings',
      defaultValue: 'Branch Name',
      bindable: true,
      /* wwEditor:start */
      bindingValidation: { type: 'string', tooltip: 'Label for the branch name field.' },
      /* wwEditor:end */
    },
    branchNamePlaceholder: {
      label: { en: 'Branch Name Placeholder' },
      type: 'Text',
      section: 'settings',
      defaultValue: 'e.g. Surabaya, Bandung Utara',
      bindable: true,
      /* wwEditor:start */
      bindingValidation: { type: 'string', tooltip: 'Placeholder for the branch name input.' },
      /* wwEditor:end */
    },
    branchNameHint: {
      label: { en: 'Branch Name Hint' },
      type: 'Text',
      section: 'settings',
      defaultValue: 'Will be saved as "{entityName} – {branchName}"',
      bindable: true,
      /* wwEditor:start */
      bindingValidation: { type: 'string', tooltip: 'Helper text below the field. Use {entityName} and {branchName} as placeholders.' },
      propertyHelp: { tooltip: 'Supports {entityName} and {branchName} tokens which are replaced dynamically.' },
      /* wwEditor:end */
    },
    branchNameRequired: {
      label: { en: 'Branch Name Error Text' },
      type: 'Text',
      section: 'settings',
      defaultValue: 'Branch name is required',
      bindable: true,
      /* wwEditor:start */
      bindingValidation: { type: 'string', tooltip: 'Validation error shown when branch name is empty.' },
      /* wwEditor:end */
    },

    contactLabel: {
      label: { en: 'Contact Person Label' },
      type: 'Text',
      section: 'settings',
      defaultValue: 'Contact Person (PIC)',
      bindable: true,
      /* wwEditor:start */
      bindingValidation: { type: 'string', tooltip: 'Label for the contact person field.' },
      /* wwEditor:end */
    },
    contactPlaceholder: {
      label: { en: 'Contact Person Placeholder' },
      type: 'Text',
      section: 'settings',
      defaultValue: 'Branch contact person name',
      bindable: true,
      /* wwEditor:start */
      bindingValidation: { type: 'string', tooltip: 'Placeholder for the contact person input.' },
      /* wwEditor:end */
    },
    contactRequired: {
      label: { en: 'Contact Error Text' },
      type: 'Text',
      section: 'settings',
      defaultValue: 'Contact person is required',
      bindable: true,
      /* wwEditor:start */
      bindingValidation: { type: 'string', tooltip: 'Validation error shown when contact person is empty.' },
      /* wwEditor:end */
    },

    phoneLabel: {
      label: { en: 'Phone Label' },
      type: 'Text',
      section: 'settings',
      defaultValue: 'Phone',
      bindable: true,
      /* wwEditor:start */
      bindingValidation: { type: 'string', tooltip: 'Label for the phone field.' },
      /* wwEditor:end */
    },
    phonePrefix: {
      label: { en: 'Phone Prefix' },
      type: 'Text',
      section: 'settings',
      defaultValue: '+62',
      bindable: true,
      /* wwEditor:start */
      bindingValidation: { type: 'string', tooltip: 'Country code prefix shown before the phone input. e.g. +62' },
      /* wwEditor:end */
    },
    phonePlaceholder: {
      label: { en: 'Phone Placeholder' },
      type: 'Text',
      section: 'settings',
      defaultValue: '8xxxxxxxxxx',
      bindable: true,
      /* wwEditor:start */
      bindingValidation: { type: 'string', tooltip: 'Placeholder for the phone number input.' },
      /* wwEditor:end */
    },
    phoneRequired: {
      label: { en: 'Phone Error Text' },
      type: 'Text',
      section: 'settings',
      defaultValue: 'Phone number is required',
      bindable: true,
      /* wwEditor:start */
      bindingValidation: { type: 'string', tooltip: 'Validation error shown when phone is empty.' },
      /* wwEditor:end */
    },

    // ══════════════════════════════
    // SETTINGS — Info Banner
    // ══════════════════════════════

    infoBannerTitle: {
      label: { en: 'Banner Title' },
      type: 'Text',
      section: 'settings',
      defaultValue: 'Inherited from parent',
      bindable: true,
      /* wwEditor:start */
      bindingValidation: { type: 'string', tooltip: 'Bold title line in the amber info banner. Leave empty to hide banner.' },
      /* wwEditor:end */
    },
    infoBannerText: {
      label: { en: 'Banner Body Text' },
      type: 'Text',
      section: 'settings',
      defaultValue: 'Email, tax ID, business registration, and credit settings are copied from the parent entity. You can override them later by editing the branch.',
      bindable: true,
      /* wwEditor:start */
      bindingValidation: { type: 'string', tooltip: 'Body text in the info banner.' },
      /* wwEditor:end */
    },

    // ══════════════════════════════
    // SETTINGS — Buttons
    // ══════════════════════════════

    confirmText: {
      label: { en: 'Confirm Button Text' },
      type: 'Text',
      section: 'settings',
      defaultValue: 'Create Branch',
      bindable: true,
      /* wwEditor:start */
      bindingValidation: { type: 'string', tooltip: 'Text on the confirm/submit button.' },
      /* wwEditor:end */
    },
    confirmColor: {
      label: { en: 'Confirm Button Color' },
      type: 'TextSelect',
      section: 'settings',
      options: {
        options: [
          { value: 'orange', label: 'Orange' },
          { value: 'blue',   label: 'Blue'   },
          { value: 'green',  label: 'Green'  },
          { value: 'red',    label: 'Red'    },
          { value: 'amber',  label: 'Amber'  },
        ],
      },
      defaultValue: 'orange',
      bindable: true,
      /* wwEditor:start */
      bindingValidation: { type: 'string', tooltip: 'Color of the confirm button: orange | blue | green | red | amber' },
      /* wwEditor:end */
    },
    cancelText: {
      label: { en: 'Cancel Button Text' },
      type: 'Text',
      section: 'settings',
      defaultValue: 'Cancel',
      bindable: true,
      /* wwEditor:start */
      bindingValidation: { type: 'string', tooltip: 'Text on the cancel button.' },
      /* wwEditor:end */
    },
    showCancelButton: {
      label: { en: 'Show Cancel Button' },
      type: 'OnOff',
      section: 'settings',
      defaultValue: true,
      bindable: true,
      /* wwEditor:start */
      bindingValidation: { type: 'boolean', tooltip: 'Toggle to hide the cancel button.' },
      /* wwEditor:end */
    },
    loadingText: {
      label: { en: 'Loading Button Text' },
      type: 'Text',
      section: 'settings',
      defaultValue: 'Creating...',
      bindable: true,
      /* wwEditor:start */
      bindingValidation: { type: 'string', tooltip: 'Text shown on the button while in loading state.' },
      /* wwEditor:end */
    },

    // ══════════════════════════════
    // SETTINGS — Loading & Behavior
    // ══════════════════════════════

    loading: {
      label: { en: 'Loading State' },
      type: 'OnOff',
      section: 'settings',
      defaultValue: false,
      bindable: true,
      /* wwEditor:start */
      bindingValidation: { type: 'boolean', tooltip: 'Bind to your workflow loading variable to show spinner.' },
      propertyHelp: { tooltip: 'When true, shows spinner on confirm button and disables all inputs.' },
      /* wwEditor:end */
    },
    autoLoading: {
      label: { en: 'Auto Loading on Confirm' },
      type: 'OnOff',
      section: 'settings',
      defaultValue: true,
      bindable: true,
      /* wwEditor:start */
      bindingValidation: { type: 'boolean', tooltip: 'ON: confirm auto-shows spinner, modal closes when visible=false. OFF: modal closes immediately.' },
      propertyHelp: { tooltip: 'Recommended ON for async Supabase operations.' },
      /* wwEditor:end */
    },
    closeOnBackdropClick: {
      label: { en: 'Close on Backdrop Click' },
      type: 'OnOff',
      section: 'settings',
      defaultValue: true,
      bindable: true,
      /* wwEditor:start */
      bindingValidation: { type: 'boolean', tooltip: 'Whether clicking the backdrop closes the modal.' },
      /* wwEditor:end */
    },
    closeOnEscape: {
      label: { en: 'Close on Escape Key' },
      type: 'OnOff',
      section: 'settings',
      defaultValue: true,
      bindable: true,
      /* wwEditor:start */
      bindingValidation: { type: 'boolean', tooltip: 'Whether pressing Escape closes the modal.' },
      /* wwEditor:end */
    },

    // ══════════════════════════════
    // STYLE TAB
    // ══════════════════════════════

    modalMaxWidth: {
      label: { en: 'Max Width' },
      type: 'Length',
      section: 'style',
      defaultValue: '480px',
      bindable: true,
      /* wwEditor:start */
      bindingValidation: { type: 'string', tooltip: 'Maximum width of the modal panel.' },
      /* wwEditor:end */
    },
    borderRadius: {
      label: { en: 'Panel Border Radius' },
      type: 'Length',
      section: 'style',
      defaultValue: '12px',
      bindable: true,
      /* wwEditor:start */
      bindingValidation: { type: 'string', tooltip: 'Border radius of the modal panel.' },
      /* wwEditor:end */
    },
    panelBackground: {
      label: { en: 'Panel Background' },
      type: 'Color',
      section: 'style',
      defaultValue: '#ffffff',
      bindable: true,
      /* wwEditor:start */
      bindingValidation: { type: 'string', tooltip: 'Background color of the modal panel.' },
      /* wwEditor:end */
    },
    backdropColor: {
      label: { en: 'Backdrop Color' },
      type: 'Color',
      section: 'style',
      defaultValue: 'rgba(0,0,0,0.4)',
      bindable: true,
      /* wwEditor:start */
      bindingValidation: { type: 'string', tooltip: 'Backdrop overlay color. Use rgba for opacity.' },
      /* wwEditor:end */
    },
    backdropBlur: {
      label: { en: 'Backdrop Blur' },
      type: 'Length',
      section: 'style',
      defaultValue: '2px',
      bindable: true,
      /* wwEditor:start */
      bindingValidation: { type: 'string', tooltip: 'Backdrop blur intensity.' },
      /* wwEditor:end */
    },
    dividerColor: {
      label: { en: 'Header Divider Color' },
      type: 'Color',
      section: 'style',
      defaultValue: '#e5e7eb',
      bindable: true,
      /* wwEditor:start */
      bindingValidation: { type: 'string', tooltip: 'Color of the line between header and body.' },
      /* wwEditor:end */
    },
    buttonRadius: {
      label: { en: 'Button Border Radius' },
      type: 'Length',
      section: 'style',
      defaultValue: '8px',
      bindable: true,
      /* wwEditor:start */
      bindingValidation: { type: 'string', tooltip: 'Border radius applied to both buttons.' },
      /* wwEditor:end */
    },
    cancelBtnColor: {
      label: { en: 'Cancel Button Text Color' },
      type: 'Color',
      section: 'style',
      defaultValue: '#4b5563',
      bindable: true,
      /* wwEditor:start */
      bindingValidation: { type: 'string', tooltip: 'Text color of the cancel button.' },
      /* wwEditor:end */
    },
    inputRadius: {
      label: { en: 'Input Border Radius' },
      type: 'Length',
      section: 'style',
      defaultValue: '8px',
      bindable: true,
      /* wwEditor:start */
      bindingValidation: { type: 'string', tooltip: 'Border radius of all input fields.' },
      /* wwEditor:end */
    },
    inputBorderColor: {
      label: { en: 'Input Border Color' },
      type: 'Color',
      section: 'style',
      defaultValue: '#d1d5db',
      bindable: true,
      /* wwEditor:start */
      bindingValidation: { type: 'string', tooltip: 'Default border color of input fields.' },
      /* wwEditor:end */
    },
    inputFocusColor: {
      label: { en: 'Input Focus Color' },
      type: 'Color',
      section: 'style',
      defaultValue: '#f97316',
      bindable: true,
      /* wwEditor:start */
      bindingValidation: { type: 'string', tooltip: 'Border and ring color when an input is focused.' },
      /* wwEditor:end */
    },
    labelColor: {
      label: { en: 'Label Color' },
      type: 'Color',
      section: 'style',
      defaultValue: '#111827',
      bindable: true,
      /* wwEditor:start */
      bindingValidation: { type: 'string', tooltip: 'Color of field labels and the modal title.' },
      /* wwEditor:end */
    },
    requiredColor: {
      label: { en: 'Required (*) Color' },
      type: 'Color',
      section: 'style',
      defaultValue: '#ef4444',
      bindable: true,
      /* wwEditor:start */
      bindingValidation: { type: 'string', tooltip: 'Color of the asterisk on required field labels.' },
      /* wwEditor:end */
    },
    hintColor: {
      label: { en: 'Hint Text Color' },
      type: 'Color',
      section: 'style',
      defaultValue: '#9ca3af',
      bindable: true,
      /* wwEditor:start */
      bindingValidation: { type: 'string', tooltip: 'Color of helper hint text below inputs.' },
      /* wwEditor:end */
    },
    phonePrefixBackground: {
      label: { en: 'Phone Prefix Background' },
      type: 'Color',
      section: 'style',
      defaultValue: '#f9fafb',
      bindable: true,
      /* wwEditor:start */
      bindingValidation: { type: 'string', tooltip: 'Background of the +62 phone prefix box.' },
      /* wwEditor:end */
    },
    phonePrefixColor: {
      label: { en: 'Phone Prefix Text Color' },
      type: 'Color',
      section: 'style',
      defaultValue: '#374151',
      bindable: true,
      /* wwEditor:start */
      bindingValidation: { type: 'string', tooltip: 'Text color of the phone prefix.' },
      /* wwEditor:end */
    },
    bannerBackground: {
      label: { en: 'Banner Background' },
      type: 'Color',
      section: 'style',
      defaultValue: '#fffbeb',
      bindable: true,
      /* wwEditor:start */
      bindingValidation: { type: 'string', tooltip: 'Background color of the info banner.' },
      /* wwEditor:end */
    },
    bannerBorderColor: {
      label: { en: 'Banner Border Color' },
      type: 'Color',
      section: 'style',
      defaultValue: '#fde68a',
      bindable: true,
      /* wwEditor:start */
      bindingValidation: { type: 'string', tooltip: 'Border color of the info banner.' },
      /* wwEditor:end */
    },
    bannerIconColor: {
      label: { en: 'Banner Icon Color' },
      type: 'Color',
      section: 'style',
      defaultValue: '#f59e0b',
      bindable: true,
      /* wwEditor:start */
      bindingValidation: { type: 'string', tooltip: 'Color of the warning icon in the banner.' },
      /* wwEditor:end */
    },
    bannerTitleColor: {
      label: { en: 'Banner Title Color' },
      type: 'Color',
      section: 'style',
      defaultValue: '#92400e',
      bindable: true,
      /* wwEditor:start */
      bindingValidation: { type: 'string', tooltip: 'Color of the banner title text.' },
      /* wwEditor:end */
    },
    bannerTextColor: {
      label: { en: 'Banner Body Text Color' },
      type: 'Color',
      section: 'style',
      defaultValue: '#b45309',
      bindable: true,
      /* wwEditor:start */
      bindingValidation: { type: 'string', tooltip: 'Color of the banner body text.' },
      /* wwEditor:end */
    },
    footerBackground: {
      label: { en: 'Footer Background' },
      type: 'Color',
      section: 'style',
      defaultValue: 'transparent',
      bindable: true,
      /* wwEditor:start */
      bindingValidation: { type: 'string', tooltip: 'Background color of the footer area.' },
      /* wwEditor:end */
    },
  },
};
