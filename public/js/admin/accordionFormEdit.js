/*eslint-disable */

const realizationsToSelect = document.querySelectorAll(
  '.choose--realization-edit',
);
const editRealizationFields = document.querySelector(
  '.edit--realization-fields',
);
const headers = document.querySelectorAll('.accordion--edit-panel');
const addSpecBox = document.querySelector('.accordion--add-spec');
const specsToDelete = document.querySelectorAll(
  '.custom--checkbox-delete-spec',
);

export const selectSpecsToDeleteHandler = () => {
  specsToDelete.forEach((el) => {
    el.addEventListener('click', () => {
      el.classList.toggle('delete--spec-checked');
    });
  });
};

const updateAddButtons = () => {
  const allSpecs = addSpecBox.querySelectorAll('.more-specs');
  allSpecs.forEach((el, i) => {
    el.classList.add('hidden');
    if (allSpecs.length - 1 === i) el.classList.remove('hidden');
  });
};

const selectRealizationHandler = (real) => {
  realizationsToSelect.forEach((el) => {
    el.closest('.edit--choose-cart').classList.remove('choose--cart-active');
  });
  editRealizationFields.classList.remove('hidden');
  real.closest('.edit--choose-cart').classList.add('choose--cart-active');
  editRealizationFields.scrollIntoView({ behavior: 'smooth' });
};

const deleteSpecificationInputs = (e) => {
  const deleteBtn = e.target.closest('.delete--spec-input');
  if (!deleteBtn || addSpecBox.childElementCount === 1) return;
  addSpecBox.removeChild(e.target.closest('.specification-box'));
  updateAddButtons();
};

const addSpecificationInputs = (e) => {
  const addBtn = e.target.closest('.more-specs');
  if (!addBtn) return;
  addSpecBox.insertAdjacentHTML(
    'beforeend',
    `
      <div class="specification-box">
        <p class="specification--box-title">Specyfikacja</p>
        <div class="specification">
          <div class="specification-data">
          <label class="label" for="spec-1-name">Nazwa parametru</label>
          <input class="input spec-name" id="spec-1-name" type="text">
          </div>
          <div class="specification-data">
          <label class="label" for="spec-1-value">Wartość parametru</label>
          <input class="input spec-value" id="spec-1-value" type="text">
          </div>
          <div class="specification-data">
            <label class="label" for="spec-1-unit">Jednostka</label>
            <select class="input spec-unit" id="spec-1-unit">
              <option value="none">brak</option>
              <option value="meter">m</option>
              <option value="meter-2">m&sup2;</option>
              <option value="meter-3">m&sup3;</option>
            </select>
          </div>
          <i class="ph ph-plus-square more-specs"></i>
          <i class="ph ph-trash delete--spec-input"></i>
        </div>
      </div>
    `,
  );
  updateAddButtons();
};

export const specificationInput = (action) => {
  if (action === 'add') {
    addSpecBox.addEventListener('click', (e) => addSpecificationInputs(e));
  }
  if (action === 'delete') {
    addSpecBox.addEventListener('click', (e) => deleteSpecificationInputs(e));
  }
};

export const init = () => {
  realizationsToSelect.forEach((real) => {
    real.addEventListener('click', () => selectRealizationHandler(real));
  });

  headers.forEach((header) => {
    header.addEventListener('click', (e) => {
      const panel = e.target.closest('.accordion--edit-panel');
      panel.nextElementSibling.classList.toggle('hidden');
      panel.querySelectorAll('.accordion--edit-arrow').forEach((el) => {
        el.classList.toggle('hidden');
      });
    });
  });
};
