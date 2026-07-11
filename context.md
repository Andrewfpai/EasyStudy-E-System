frontend/
  app/                              (routing only)
    page.tsx                       ✅ dashboard, route "/"
    add-student/page.tsx           ✅
    students/
      page.tsx                     ⏳ students list route
      [studentId]/page.tsx         ⏳ student detail route
      [studentId]/edit/page.tsx    ⏳ student edit route
    layout.tsx                     ⏳ just needs import paths updated
    ClientLayout.tsx               ⏳ just needs import paths updated

  features/
    students/
      list/                        ✅ done
        StudentListHome.tsx
        StudentCard.tsx
        StatusAvatar.tsx
        StudentFilters.tsx
        useStudentFilters.ts

      form/                        ✅ done
        StudentForm.tsx
        StudentFormFieldsLeft.tsx
        StudentFormFieldsRight.tsx
        DatePickerField.tsx
        SelectWithOtherField.tsx
        useStudentFormState.ts

      attendance/                  ✅ done
        AttendanceContainer.tsx
        components/
          AttendanceSearchBar.tsx
          TokenSubtractControl.tsx
          AttendanceTable.tsx
          AttendanceTableRow.tsx
        hooks/
          useStudentFilter.ts
          useAttendanceSelection.ts
          useTokenSubtraction.ts

      detail/                      ⏳ not started
        Details.tsx
        TambahToken.tsx
        TokenAttendance.tsx
        TokenHistory.tsx
        EditInfo.tsx

  components/
    ui/                            (shadcn primitives — table, select, calendar, popover, checkbox, button, sidebar, dropdown-menu)
    common/
      SuccessCard.tsx              ✅ done
    layout/
      AppSidebar.tsx               ⏳ not started

  hooks/
    useDebounce.ts                 ✅ done

  lib/
    api.ts                        (unchanged — no split needed)

  types/
    student.types.ts               ✅ done