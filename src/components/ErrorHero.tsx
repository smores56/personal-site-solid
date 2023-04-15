export default function ErrorHero() {
  return (
    <div class="bg-red-50 border border-red-200 rounded-md p-4" role="alert">
      <div class="flex">
        <div class="flex-shrink-0">
          <CrossIcon/>
        </div>
        <div class="ml-4">
          <h3 class="text-sm text-red-800 font-semibold">
            A problem has been occurred while submitting your data.
          </h3>
          <div class="mt-2 text-sm text-red-700">
            <ul class="list-disc space-y-1 pl-5">
              <li>
                This username is already in use
              </li>
              <li>
                Email field can't be empty
              </li>
              <li>
                Please enter a valid phone number
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

function CrossIcon() {
  return (
    <svg class="h-4 w-4 text-red-400 mt-0.5" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
      <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293 5.354 4.646z"/>
    </svg>
  );
}
