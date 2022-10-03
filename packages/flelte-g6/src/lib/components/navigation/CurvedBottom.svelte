<script lang="ts">
  export let options = []
  export let modelValue = ''
  let oldModelValue
  export let foregroundColor = '#000'
  export let backgroundColor = '#fff'
  export let iconColor = '#ff0'
  export let badgeColor = '#0ff'

  let localOptions = []
  let enableWatch = true

  const isActive = (option, value = modelValue) => {
    return option.id === value || (option.childs || []).find((c) => c.id === value)
  }

  $: {
    localOptions = options.map((opt) => ({ ...opt, isActive: isActive(opt) }))
  }
  $: haveActiveClass = localOptions.find((opt) => opt.isActive)
  $: childs = ((localOptions.find((opt) => opt.isActive) || {}).childs || []).length
  $: cssVariables = `--color-foreground: ${foregroundColor}; --color-background: ${backgroundColor}; --color-icon: ${iconColor}; --color-badge: ${badgeColor}; --with-parent: ${
    childs * 45
  }px`
  $: {
    if (oldModelValue !== modelValue && enableWatch) {
    }

    oldModelValue = modelValue
  }
</script>

<div class="btn-container_foreground" style={cssVariables} />

<style>
  @unocss-placeholder;
</style>
